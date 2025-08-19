import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Post } from '@/shared/types';
import { createPost, deletePost, updatePost } from '@/shared/api';

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, Partial<Post>>({
    mutationFn: newPost => createPost(newPost),
    onSuccess: createdPost => {
      // Invalidate posts cache to refresh the list
      queryClient.invalidateQueries({ queryKey: ['posts'] });

      // Invalidate infinite posts cache
      queryClient.invalidateQueries({ queryKey: ['posts', 'infinite'] });

      // Set the new post data in cache to ensure fresh data
      queryClient.setQueryData(['post', createdPost.id], createdPost);

      // Clear any stale comments cache for this post
      queryClient.removeQueries({ queryKey: ['comments', createdPost.id] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation<
    Post,
    Error,
    {
      postId: string;
      onProgress?: (progress: {
        total: number;
        deleted: number;
        current: string;
      }) => void;
    }
  >({
    mutationFn: ({ postId, onProgress }) => deletePost(postId, onProgress),
    onSuccess: (_, { postId }) => {
      // Invalidate posts cache
      queryClient.invalidateQueries({ queryKey: ['posts'] });

      // Invalidate infinite posts cache
      queryClient.invalidateQueries({ queryKey: ['posts', 'infinite'] });

      // Remove the specific post from cache to prevent stale data
      queryClient.removeQueries({ queryKey: ['post', postId] });

      // Also invalidate comments cache for this post to prevent orphaned comments from appearing
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });

      // Remove comments data from cache since the post is deleted
      queryClient.removeQueries({ queryKey: ['comments', postId] });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, { postId: string; post: Partial<Post> }>({
    mutationFn: ({ postId, post }) => updatePost(postId, post),
    onSuccess: (updatedPost, { postId }) => {
      // Invalidate posts cache to refresh the list
      queryClient.invalidateQueries({ queryKey: ['posts'] });

      // Invalidate infinite posts cache
      queryClient.invalidateQueries({ queryKey: ['posts', 'infinite'] });

      // Set fresh data for the specific post
      queryClient.setQueryData(['post', postId], updatedPost);

      // Invalidate post cache to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
}
