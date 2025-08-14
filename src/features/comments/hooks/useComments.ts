import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Comment } from "@/shared/types";
import { createComment, deleteComment, updateComment } from "@/shared/api";

export function useCreateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newComment: Partial<Comment>) =>
      createComment(postId, newComment),
    onSuccess: (createdComment: Comment) => {
      // Update comments cache by appending new comment
      queryClient.setQueryData<Comment[]>(["comments", postId], (oldComments = []) => [
        ...oldComments,
        createdComment,
      ]);
    },
  });
}

export function useDeleteComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(postId, commentId),
    onSuccess: (deletedComment) => {
      // Update comments cache by filtering out deleted comment
      queryClient.setQueryData<Comment[]>(["comments", postId], (oldComments = []) =>
        oldComments.filter(comment => comment.id !== deletedComment.id)
      );
    },
  });
}

export function useUpdateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, comment }: { commentId: string; comment: Partial<Comment> }) =>
      updateComment(postId, commentId, comment),
    onSuccess: (updatedComment) => {
      // Update comments cache by replacing updated comment
      queryClient.setQueryData<Comment[]>(["comments", postId], (oldComments = []) =>
        oldComments.map(comment => 
          comment.id === updatedComment.id ? updatedComment : comment
        )
      );
    },
  });
}
