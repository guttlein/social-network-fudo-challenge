// src/hooks.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Comment } from "../types";
import { createComment, deleteComment, updateComment } from "../api";

/**
 * Hook to create a new comment for a given post ID.
 * On success, invalidates the "comments" query for that post to refresh the comment list.
 */
export function useCreateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newComment: Partial<Comment>) =>
      createComment(postId, newComment),
    onSuccess: (createdComment: Comment) => {
      // Update the comments cache for this post by appending the new comment
      queryClient.setQueryData<Comment[]>(["comments", postId], (oldComments = []) => [
        ...oldComments,
        createdComment,
      ]);
    },
  });
}

/**
 * Hook to delete a comment by its ID from a given post ID.
 * On success, invalidates the "comments" query for that post to refresh the comment list.
 */
export function useDeleteComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(postId, commentId),
    onSuccess: (deletedComment) => {
      // Update the comments cache by filtering out the deleted comment by ID
      queryClient.setQueryData<Comment[]>(["comments", postId], (oldComments = []) =>
        oldComments.filter(comment => comment.id !== deletedComment.id)
      );
    },
  });
}

/**
 * Hook to update a comment by its ID from a given post ID.
 * On success, updates the comments cache for that post.
 */
export function useUpdateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, comment }: { commentId: string; comment: Partial<Comment> }) =>
      updateComment(postId, commentId, comment),
    onSuccess: (updatedComment) => {
      // Update the comments cache by replacing the updated comment
      queryClient.setQueryData<Comment[]>(["comments", postId], (oldComments = []) =>
        oldComments.map(comment => 
          comment.id === updatedComment.id ? updatedComment : comment
        )
      );
    },
  });
}
