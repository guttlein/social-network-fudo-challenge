import { useState } from 'react';
import {
  PostCard,
  PostForm,
  SkeletonList,
  ConfirmDeleteModal,
  InfiniteScrollLoader,
} from '@/shared/components';
import { useInfinitePosts } from '@/shared/hooks/useInfinitePosts';
import { useThresholdFetch } from '@/shared/hooks/useThresholdFetch';
import { useToastActions } from '@/shared/hooks/useToastActions';
import { createPost, deletePost, updatePost } from '@/shared/api';
import type { Post } from '@/shared/types';

export default function Home() {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const { showSuccess, showError } = useToastActions();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch: refreshPosts,
  } = useInfinitePosts();

  const targetRef = useThresholdFetch(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  const handleCreatePost = async (data: { title: string; content: string }) => {
    try {
      setIsCreatingPost(true);
      await createPost(data);
      showSuccess(
        'Post created successfully!',
        'Your post has been published.'
      );
      refreshPosts();
    } catch {
      showError('Failed to create post', 'Please try again later.');
    } finally {
      setIsCreatingPost(false);
    }
  };

  const handleDeletePost = async (post: Post) => {
    try {
      await deletePost(post.id);
      showSuccess('Post deleted successfully!', 'Your post has been removed.');
      refreshPosts();
      setPostToDelete(null);
    } catch {
      showError('Failed to delete post', 'Please try again later.');
    }
  };

  const handleEditPost = async (data: { title: string; content: string }) => {
    if (!postToEdit) return;

    try {
      await updatePost(postToEdit.id, data);
      showSuccess('Post updated successfully!', 'Your post has been modified.');
      refreshPosts();
      setPostToEdit(null);
    } catch {
      showError('Failed to update post', 'Please try again later.');
    }
  };

  const posts = data?.pages.flatMap(page => page.posts) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Social Network
          </h1>
          <p className="text-gray-600">
            Share your thoughts with the community
          </p>
        </div>

        {/* Create Post Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Create a new post
          </h2>
          <PostForm
            onSubmit={handleCreatePost}
            submitText="Create Post"
            isLoading={isCreatingPost}
            maxTitleLength={100}
            maxContentLength={1000}
          />
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {isLoading ? (
            <SkeletonList count={3} type="post" />
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No posts yet. Be the first to share something!
              </p>
            </div>
          ) : (
            <>
              {posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDelete={() => setPostToDelete(post)}
                  onEdit={() => setPostToEdit(post)}
                />
              ))}

              {/* Infinite Scroll Loader */}
              <InfiniteScrollLoader
                isLoading={isLoading}
                isFetchingNextPage={isFetchingNextPage}
              />

              {/* Intersection Observer Target */}
              <div ref={targetRef} className="h-4" />
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!postToDelete}
        onClose={() => setPostToDelete(null)}
        onConfirm={() => postToDelete && handleDeletePost(postToDelete)}
        title="Delete Post"
        message={`Are you sure you want to delete this post? This action cannot be undone.`}
        confirmText="Delete Post"
      />

      {/* Edit Post Modal */}
      {postToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Edit Post</h2>
              <button
                onClick={() => setPostToEdit(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <PostForm
                onSubmit={handleEditPost}
                onCancel={() => setPostToEdit(null)}
                initialTitle={postToEdit.title}
                initialContent={postToEdit.content}
                submitText="Update Post"
                maxTitleLength={100}
                maxContentLength={1000}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
