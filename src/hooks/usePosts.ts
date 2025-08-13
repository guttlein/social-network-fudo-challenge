// src/hooks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../types";
import { createPost, deletePost } from "../api";

/**
 * Hook to create a new post.
 * On success, invalidates the "posts" query to refresh the post list.
 */
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, Partial<Post>>({
    mutationFn: (newPost) => createPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

/**
 * Hook to delete a post by ID.
 * On success, invalidates the "posts" query to refresh the post list.
 */
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, string>({
    mutationFn: (postId) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
