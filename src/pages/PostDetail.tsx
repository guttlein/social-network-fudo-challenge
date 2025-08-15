import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSinglePost, getComments } from '@/shared/api';
import type { Post, Comment } from '@/shared/types';
import {
  useCreateComment,
  useDeleteComment,
  useUpdateComment,
} from '@/features/comments';
import { buildCommentTree } from '@/shared/utils/buildCommentTree';
import { CommentItem } from '@/shared/components/molecules/CommentItem';
import { useToastActions } from '@/shared/hooks';
import {
  PostSkeleton,
  SkeletonList,
  ConfirmDeleteModal,
} from '@/shared/components';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const postId = id!;

  const [newCommentContent, setNewCommentContent] = useState('');
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    commentId: string | null;
  }>({
    isOpen: false,
    commentId: null,
  });
  const {
    showCommentCreated,
    showCommentUpdated,
    showCommentDeleted,
    showErrorCreating,
    showErrorUpdating,
    showErrorDeleting,
  } = useToastActions();

  const { mutate: createComment, isPending: isCreating } =
    useCreateComment(postId);
  const { mutate: deleteComment, isPending: isDeleting } =
    useDeleteComment(postId);
  const { mutate: updateComment, isPending: isUpdating } =
    useUpdateComment(postId);

  const {
    data: post,
    isLoading: loadingPost,
    error: errorPost,
  } = useQuery<Post | null, Error>({
    queryKey: ['post', postId],
    queryFn: () => getSinglePost(postId),
    enabled: !!postId,
  });

  const {
    data: comments = [],
    isLoading: loadingComments,
    error: errorComments,
  } = useQuery<Comment[], Error>({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
    enabled: !!postId,
  });

  const commentTree = buildCommentTree(comments);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString();

  const handleCreateComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentContent.trim()) return;

    createComment(
      {
        content: newCommentContent,
        name: 'Demo User',
        avatar: 'https://i.pravatar.cc/150?u=demo',
        parentId: null,
      },
      {
        onSuccess: () => {
          setNewCommentContent('');
          showCommentCreated();
        },
        onError: () => showErrorCreating('Comment'),
      }
    );
  };

  const handleReply = (content: string, parentId: string) => {
    createComment(
      {
        content,
        name: 'Demo User',
        avatar: 'https://i.pravatar.cc/150?u=demo',
        parentId,
      },
      {
        onSuccess: () => showCommentCreated(),
        onError: () => showErrorCreating('Comment'),
      }
    );
  };

  const handleDeleteComment = (commentId: string) => {
    setDeleteModal({ isOpen: true, commentId });
  };

  const confirmDeleteComment = () => {
    if (deleteModal.commentId) {
      deleteComment(deleteModal.commentId, {
        onSuccess: () => showCommentDeleted(),
        onError: () => showErrorDeleting('Comment'),
      });
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, commentId: null });
  };

  const handleUpdateComment = (commentId: string, content: string) => {
    updateComment(
      { commentId, comment: { content } },
      {
        onSuccess: () => showCommentUpdated(),
        onError: () => showErrorUpdating('Comment'),
      }
    );
  };

  if (loadingPost || loadingComments)
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <PostSkeleton />
          <div className="mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900">
              Comments
            </h2>
            <SkeletonList type="comment" count={3} />
          </div>
        </div>
      </div>
    );
  if (errorPost)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error Loading Post
          </h3>
          <p className="text-red-500 text-sm">{errorPost?.message}</p>
        </div>
      </div>
    );
  if (errorComments)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error Loading Comments
          </h3>
          <p className="text-red-500 text-sm">{errorComments.message}</p>
        </div>
      </div>
    );
  if (!post)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Post not found</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
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

        {/* Post content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            <img
              src={post.avatar}
              alt={post.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-900 text-base sm:text-lg mb-1">
                {post.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>
          <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* Comments section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              Comments
            </h2>
            <p className="text-gray-600 text-sm">Join the conversation</p>
          </div>

          {/* New comment form */}
          <div className="mb-8 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200">
            <form onSubmit={handleCreateComment}>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 sm:p-4 mb-4 text-sm sm:text-base resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Add a comment..."
                value={newCommentContent}
                onChange={e => setNewCommentContent(e.target.value)}
                rows={3}
              />
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
                <button
                  type="submit"
                  disabled={isCreating || !newCommentContent.trim()}
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base"
                >
                  {isCreating ? 'Adding...' : 'Add Comment'}
                </button>
                {newCommentContent.trim() && (
                  <button
                    type="button"
                    onClick={() => setNewCommentContent('')}
                    className="w-full sm:w-auto px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Comments list */}
          <div className="space-y-4 sm:space-y-6">
            {commentTree.length > 0 ? (
              commentTree.map(comment => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onDelete={handleDeleteComment}
                  onReply={handleReply}
                  onUpdate={handleUpdateComment}
                  isDeleting={isDeleting}
                  isCreating={isCreating}
                  isUpdating={isUpdating}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No comments yet
                </h3>
                <p className="text-gray-500 text-sm">
                  Be the first to comment on this post!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteComment}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
        confirmText="Delete Comment"
        isDeleting={isDeleting}
      />
    </div>
  );
}
