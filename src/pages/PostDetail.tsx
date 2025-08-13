import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSinglePost, getComments } from "../api";
import type { Post, Comment } from "../types";
import { useCreateComment, useDeleteComment } from "../hooks/useComments";
import { buildCommentTree } from "../utils/buildCommentTree";
import { CommentItem } from "../components/CommentItem";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const postId = id!;

  const [newCommentContent, setNewCommentContent] = useState("");

  const { mutate: createComment, isPending: isCreating } = useCreateComment(postId);
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment(postId);

  const { data: post, isLoading: loadingPost, error: errorPost } = useQuery<Post | null, Error>({
    queryKey: ["post", postId],
    queryFn: () => getSinglePost(postId),
    enabled: !!postId,
  });

  const { data: comments = [], isLoading: loadingComments, error: errorComments } = useQuery<Comment[], Error>({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
    enabled: !!postId,
  });

  const commentTree = buildCommentTree(comments);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString();

  const handleCreateComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentContent.trim()) return;

    createComment(
      {
        content: newCommentContent,
        name: "Demo User",
        avatar: "https://i.pravatar.cc/150?u=demo",
        parentId: null,
      },
      { onSuccess: () => setNewCommentContent("") }
    );
  };

  const handleReply = (content: string, parentId: string) => {
    createComment({
      content,
      name: "Demo User",
      avatar: "https://i.pravatar.cc/150?u=demo",
      parentId,
    });
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId);
  };

  if (loadingPost || loadingComments) return <p className="text-center mt-10">Loading...</p>;
  if (errorPost) return <p className="text-center mt-10 text-red-500">Error: {errorPost?.message}</p>;
  if (errorComments) return <p className="text-center mt-10 text-red-500">Error loading comments: {errorComments.message}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link to="/" className="text-blue-600 hover:underline text-sm">
        ← Go back to posts
      </Link>

      <div className="border p-4 rounded shadow-sm bg-white mt-4">
        <div className="flex items-center mb-2">
          <img src={post?.avatar} alt={post?.name} className="w-8 h-8 rounded-full mr-2" />
          <div>
            <span className="font-semibold">{post?.name}</span>
            <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
          </div>
        </div>
        <p>{post?.content}</p>
      </div>

      <h2 className="text-xl font-bold mt-6 mb-2">Comments</h2>
      {comments.length === 0 && <p>No comments yet</p>}

      {/* Root comment */}
      <form onSubmit={handleCreateComment} className="mb-4">
        <textarea
          className="w-full border rounded p-2 mb-2"
          placeholder="Add a comment..."
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
          rows={2}
          disabled={isCreating}
        />
        <button
          type="submit"
          disabled={isCreating}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isCreating ? "Posting..." : "Post Comment"}
        </button>
      </form>

      <div className="space-y-3">
        {commentTree.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={handleDeleteComment}
            onReply={handleReply}
            isDeleting={isDeleting}
            isCreating={isCreating}
          />
        ))}
      </div>
    </div>
  );
}
