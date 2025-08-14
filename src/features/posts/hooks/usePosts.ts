import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "@/shared/types";
import { createPost, deletePost, updatePost } from "@/shared/api";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, Partial<Post>>({
    mutationFn: (newPost) => createPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, string>({
    mutationFn: (postId) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

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
