import { useState } from "react";

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api";
import type { Post } from "../types";
import { useCreatePost, useDeletePost } from "../hooks/usePosts";

export default function Home() {
  const [newPostContent, setNewPostContent] = useState("");

  const { mutate: createPost, isPending: isCreating } = useCreatePost();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  // Use React Query to fetch posts
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const handleCreatePost = () => {
    createPost({ content: newPostContent, name: "Demo user", avatar: "https://i.pravatar.cc/150?u=demo" });
    setNewPostContent(""); // Clear input after creating post
  }

  const handleDeletePost = (postId: string) => {
    deletePost(postId);
  }

  if (isLoading) return <p className="text-center mt-10">Loading posts...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>

      {/* Form for new posts */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!newPostContent.trim()) return;
          handleCreatePost();
        }}
        className="mb-6"
      >
        <textarea
          className="w-full border rounded p-2 mb-2"
          placeholder="New post..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          rows={3}
        />
        <button
          type="submit"
          disabled={isCreating}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isCreating ? "Creating..." : "Create Post"}
        </button>
      </form>

      {/* Posts list */}
      <div className="space-y-4">
        {posts?.map((post) => (
          <div key={post.id} className="border p-4 rounded shadow-sm bg-white">
            <div className="flex items-center mb-2">
              <img
                src={post.avatar}
                alt={post.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="font-semibold">{post.name}</span>
            </div>
            <p>{post.content}</p>

            <div className="flex justify-between items-center mt-2">
              <Link
                to={`/post/${post.id}`}
                className="text-blue-600 text-sm hover:underline"
              >
                See Details
              </Link>

              <button
                onClick={() => handleDeletePost(post.id)}
                disabled={isDeleting}
                className="text-red-600 hover:underline disabled:opacity-50 text-sm"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
