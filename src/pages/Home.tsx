import { useState } from 'react';
import {
  PostCard,
  CommentForm,
  SkeletonList,
  ConfirmDeleteModal,
  InfiniteScrollLoader,
} from '@/shared/components';
import { useInfinitePosts } from '@/shared/hooks/useInfinitePosts';
import { useThresholdFetch } from '@/shared/hooks/useThresholdFetch';
import { useToastActions } from '@/shared/hooks/useToastActions';
import { createPost, deletePost } from '@/shared/api';
import type { Post } from '@/shared/types';

export default function Home() {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
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

  const handleCreatePost = async (content: string) => {
    try {
      setIsCreatingPost(true);
      await createPost({ content });
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
          <CommentForm
            onSubmit={handleCreatePost}
            placeholder="What's on your mind?"
            submitText="Create Post"
            isLoading={isCreatingPost}
            maxLength={1000}
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
    </div>
  );
}
