import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInfinitePosts, useThresholdFetch } from '@/shared/hooks';
import type { Post } from '@/shared/types';
import { useCreatePost, useDeletePost, useUpdatePost } from '@/features/posts';
import {
  SkeletonList,
  ConfirmDeleteModal,
  InfiniteScrollLoader,
} from '@/shared/components';
import { useToastActions } from '@/shared/hooks';

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

  const {
    showPostCreated,
    showPostUpdated,
    showPostDeleted,
    showErrorCreating,
    showErrorUpdating,
    showErrorDeleting,
  } = useToastActions();

  const { mutate: createPost, isPending: isCreating } = useCreatePost();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();

  // Infinite scroll hook
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePosts({ pageSize: 5 });

  // Load more posts
  const loadMoreRef = useThresholdFetch(
    () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    { enabled: !!hasNextPage && !isFetchingNextPage }
  );

  // Flatten all posts from all pages
  const allPosts = data?.pages.flatMap(page => page.posts) ?? [];

  const handleCreatePost = () => {
    createPost(
      {
        content: newPostContent,
        name: 'Demo user',
        avatar: 'https://i.pravatar.cc/150?u=demo',
      },
      {
        onSuccess: () => {
          setNewPostContent('');
          showPostCreated();
        },
        onError: () => showErrorCreating('Post'),
      }
    );
  };

  const handleDeletePost = (postId: string) => {
    setDeleteModal({ isOpen: true, postId });
  };

  const confirmDeletePost = () => {
    if (deleteModal.postId) {
      deletePost(deleteModal.postId, {
        onSuccess: () => showPostDeleted(),
        onError: () => showErrorDeleting('Post'),
      });
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
    updatePost(
      { postId, post: { content: editContent } },
      {
        onSuccess: () => {
          setEditingPost(null);
          setEditContent('');
          showPostUpdated();
        },
        onError: () => showErrorUpdating('Post'),
      }
    );
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditContent('');
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
            Posts
          </h1>
          <SkeletonList type="post" count={5} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Posts
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Share your thoughts with the community
          </p>
        </div>

        {/* Form for new posts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
          <form
            onSubmit={e => {
              e.preventDefault();
              if (!newPostContent.trim()) return;
              handleCreatePost();
            }}
          >
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 sm:p-4 mb-4 text-sm sm:text-base resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="What's on your mind?"
              value={newPostContent}
              onChange={e => setNewPostContent(e.target.value)}
              rows={3}
            />
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
              <button
                type="submit"
                disabled={isCreating || !newPostContent.trim()}
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base"
              >
                {isCreating ? 'Creating...' : 'Create Post'}
              </button>
              {newPostContent.trim() && (
                <button
                  type="button"
                  onClick={() => setNewPostContent('')}
                  className="w-full sm:w-auto px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Posts list */}
        <div className="space-y-4 sm:space-y-6">
          {allPosts.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6"
            >
              {/* Post Header */}
              <div className="flex items-start gap-3 mb-4">
                <img
                  src={post.avatar}
                  alt={post.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                        {post.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {formatDate(post.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              {editingPost === post.id ? (
                <div className="mb-4">
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    rows={3}
                  />
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3">
                    <button
                      onClick={() => handleUpdatePost(post.id)}
                      disabled={isUpdating}
                      className="flex-1 sm:flex-none bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors text-sm font-medium"
                    >
                      {isUpdating ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-800 text-sm sm:text-base leading-relaxed mb-4">
                  {post.content}
                </p>
              )}

              {/* Post Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100">
                <Link
                  to={`/post/${post.id}`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                >
                  See Details →
                </Link>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEditPost(post)}
                    className="text-gray-600 hover:text-gray-800 text-sm transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    disabled={isDeleting}
                    className="text-red-600 hover:text-red-700 disabled:opacity-50 text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Infinite Scroll Loader */}
        <div ref={loadMoreRef} className="mt-6">
          <InfiniteScrollLoader
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>

        {/* Empty State */}
        {allPosts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No posts yet
            </h3>
            <p className="text-gray-500 text-sm">
              Be the first to share something!
            </p>
          </div>
        )}
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
