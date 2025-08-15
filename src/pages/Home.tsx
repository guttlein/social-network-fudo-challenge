import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/shared/api';
import type { Post } from '@/shared/types';
import { useCreatePost, useDeletePost, useUpdatePost } from '@/features/posts';
import { SkeletonList, ConfirmDeleteModal } from '@/shared/components';

export default function Home() {
  const [newPostContent, setNewPostContent] = useState('');
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    postId: string | null;
  }>({
    isOpen: false,
    postId: null,
  });

  const { mutate: createPost, isPending: isCreating } = useCreatePost();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  const handleCreatePost = () => {
    createPost({
      content: newPostContent,
      name: 'Demo user',
      avatar: 'https://i.pravatar.cc/150?u=demo',
    });
    setNewPostContent('');
  };

  const handleDeletePost = (postId: string) => {
    setDeleteModal({ isOpen: true, postId });
  };

  const confirmDeletePost = () => {
    if (deleteModal.postId) {
      deletePost(deleteModal.postId);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, postId: null });
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post.id);
    setEditContent(post.content);
  };

  const handleUpdatePost = (postId: string) => {
    updatePost({ postId, post: { content: editContent } });
    setEditingPost(null);
    setEditContent('');
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditContent('');
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString();

  if (isLoading)
    return (
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Posts</h1>
        <SkeletonList type="post" count={5} />
      </div>
    );
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>

      {/* Form for new posts */}
      <form
        onSubmit={e => {
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
          onChange={e => setNewPostContent(e.target.value)}
          rows={3}
        />
        <button
          type="submit"
          disabled={isCreating}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isCreating ? 'Creating...' : 'Create Post'}
        </button>
      </form>

      {/* Posts list */}
      <div className="space-y-4">
        {posts?.map(post => (
          <div key={post.id} className="border p-4 rounded shadow-sm bg-white">
            <div className="flex items-center mb-2">
              <img
                src={post.avatar}
                alt={post.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <span className="font-semibold">{post.name}</span>
                <p className="text-xs text-gray-500">
                  {formatDate(post.createdAt)}
                </p>
              </div>
            </div>
            {editingPost === post.id ? (
              <div className="mb-2">
                <textarea
                  className="w-full border rounded p-2 mb-2"
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdatePost(post.id)}
                    disabled={isUpdating}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50 text-sm"
                  >
                    {isUpdating ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="mb-2">{post.content}</p>
            )}

            <div className="flex justify-between items-center mt-2">
              <Link
                to={`/post/${post.id}`}
                className="text-blue-600 text-sm hover:underline"
              >
                See Details
              </Link>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEditPost(post)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  disabled={isDeleting}
                  className="text-red-600 hover:underline disabled:opacity-50 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeletePost}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete Post"
        isDeleting={isDeleting}
      />
    </div>
  );
}
