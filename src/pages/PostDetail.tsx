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
      { onSuccess: () => setNewCommentContent('') }
    );
  };

  const handleReply = (content: string, parentId: string) => {
    createComment({
      content,
      name: 'Demo User',
      avatar: 'https://i.pravatar.cc/150?u=demo',
      parentId,
    });
  };

  const handleDeleteComment = (commentId: string) => {
    setDeleteModal({ isOpen: true, commentId });
  };

  const confirmDeleteComment = () => {
    if (deleteModal.commentId) {
      deleteComment(deleteModal.commentId);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, commentId: null });
  };

  const handleUpdateComment = (commentId: string, content: string) => {
    updateComment({ commentId, comment: { content } });
  };

  if (loadingPost || loadingComments)
    return (
      <div className="max-w-3xl mx-auto p-4">
        <PostSkeleton />
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          <SkeletonList type="comment" count={3} />
        </div>
      </div>
    );
  if (errorPost)
    return (
      <p className="text-center mt-10 text-red-500">
        Error: {errorPost?.message}
      </p>
    );
  if (errorComments)
    return (
      <p className="text-center mt-10 text-red-500">
        Error loading comments: {errorComments.message}
      </p>
    );
  if (!post) return <p>Post not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link to="/" className="text-blue-600 hover:underline text-sm">
        ← Go back to posts
      </Link>

      {/* Post content */}
      <div className="border p-4 rounded shadow-sm bg-white mb-6">
        <div className="flex items-center mb-2">
          <img
            src={post.avatar}
            alt={post.name}
            className="w-8 h-8 rounded-full mr-2"
          />
          <div>
            <span className="font-semibold">{post.name}</span>
            <p className="text-xs text-gray-500">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
        <p className="mb-2">{post.content}</p>
      </div>

      {/* Comments section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>

        {/* New comment form */}
        <form onSubmit={handleCreateComment} className="mb-6">
          <textarea
            className="w-full border rounded p-2 mb-2"
            placeholder="Add a comment..."
            value={newCommentContent}
            onChange={e => setNewCommentContent(e.target.value)}
            rows={3}
          />
          <button
            type="submit"
            disabled={isCreating}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isCreating ? 'Adding...' : 'Add Comment'}
          </button>
        </form>

        {/* Comments list */}
        <div className="space-y-4">
          {commentTree.map(comment => (
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
          ))}
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
