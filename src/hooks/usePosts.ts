import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../types";
import { createPost, deletePost, updatePost } from "../api";

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

/**
 * Hook to update a post by ID.
 * On success, invalidates both "posts" and the specific post queries.
 */
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation<
    Post,
    Error,
    { postId: string; post: Partial<Post> }
  >({
    mutationFn: ({ postId, post }) => updatePost(postId, post),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
}
