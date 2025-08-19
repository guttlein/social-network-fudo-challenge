import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Post } from '@/shared/types';
import { createPost, deletePost, updatePost } from '@/shared/api';

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, Partial<Post>>({
    mutationFn: newPost => createPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
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
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
}
