import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  PostSkeleton,
  SkeletonList,
  CommentForm,
  CommentItem,
  ConfirmDeleteModal,
} from '@/shared/components';
import { useToastActions } from '@/shared/hooks/useToastActions';
import {
  getSinglePost,
  getComments,
  createComment,
  deleteComment,
  updateComment,
} from '@/shared/api';
import { buildCommentTree } from '@/shared/utils/buildCommentTree';
import type { Post, Comment } from '@/shared/types';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);
  const { showSuccess, showError } = useToastActions();

  const {
    data: post,
    isLoading: isPostLoading,
    error: postError,
    refetch: refetchPost,
  } = useQuery<Post | null>({
    queryKey: ['post', id],
    queryFn: () => getSinglePost(id!),
    enabled: !!id,
  });

  const {
    data: comments = [],
    isLoading: isCommentsLoading,
    refetch: refetchComments,
  } = useQuery<Comment[]>({
    queryKey: ['comments', id],
    queryFn: () => getComments(id!),
    enabled: !!id,
  });

  const handleCreateComment = async (content: string) => {
    if (!id) return;

    try {
      await createComment(id, { content });
      showSuccess(
        'Comment created successfully!',
        'Your comment has been posted.'
      );
      refetchComments();
      refetchPost();
    } catch {
      showError('Failed to create comment', 'Please try again later.');
    }
  };

  const handleDeleteComment = async (comment: Comment) => {
    if (!id) return;

    try {
      await deleteComment(id, comment.id);
      showSuccess(
        'Comment deleted successfully!',
        'Your comment has been removed.'
      );
      refetchComments();
      refetchPost();
      setCommentToDelete(null);
    } catch {
      showError('Failed to delete comment', 'Please try again later.');
    }
  };

  const handleUpdateComment = async (commentId: string, content: string) => {
    if (!id) return;

    try {
      await updateComment(id, commentId, { content });
      showSuccess(
        'Comment updated successfully!',
        'Your comment has been updated.'
      );
      refetchComments();
    } catch {
      showError('Failed to update comment', 'Please try again later.');
    }
  };

  const handleReplyComment = async (parentId: string, content: string) => {
    if (!id) return;

    try {
      await createComment(id, { content, parentId });
      showSuccess('Reply posted successfully!', 'Your reply has been posted.');
      refetchComments();
      refetchPost();
    } catch {
      showError('Failed to post reply', 'Please try again later.');
    }
  };

  if (isPostLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <PostSkeleton />
        </div>
      </div>
    );
  }

  if (postError || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Post not found
          </h1>
          <p className="text-gray-600 mb-6">
            The post you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  const commentTree = buildCommentTree(comments || []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Posts
          </Link>
        </div>

        {/* Post */}
        <article className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={post.avatar || '/default-avatar.png'}
              alt={post.name}
              className="w-12 h-12 rounded-full object-cover"
              onError={e => {
                e.currentTarget.src = '/default-avatar.png';
              }}
            />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {post.name}
              </h1>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <p className="text-gray-800 leading-relaxed text-lg">
            {post.content}
          </p>
        </article>

        {/* Create Comment Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Add a comment
          </h2>
          <CommentForm
            onSubmit={handleCreateComment}
            placeholder="Share your thoughts..."
            submitText="Post Comment"
            maxLength={500}
          />
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Comments ({commentTree.length})
          </h2>

          {isCommentsLoading ? (
            <SkeletonList count={3} type="comment" />
          ) : commentTree.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No comments yet. Be the first to comment!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {commentTree.map(comment => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  level={0}
                  onDelete={() => setCommentToDelete(comment)}
                  onReply={handleReplyComment}
                  onUpdate={handleUpdateComment}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!commentToDelete}
        onClose={() => setCommentToDelete(null)}
        onConfirm={() =>
          commentToDelete && handleDeleteComment(commentToDelete)
        }
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
        confirmText="Delete Comment"
      />
    </div>
  );
}
