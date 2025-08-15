import { useState } from 'react';
import type { CommentNode } from '../../types';

interface CommentItemProps {
  comment: CommentNode;
  onDelete: (id: string) => void;
  onReply: (content: string, parentId: string) => void;
  onUpdate: (id: string, content: string) => void;
  isDeleting?: boolean;
  isCreating?: boolean;
  isUpdating?: boolean;
  level?: number;
}

export function CommentItem({
  comment,
  onDelete,
  onReply,
  onUpdate,
  isDeleting = false,
  isCreating = false,
  isUpdating = false,
  level = 0,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [replyContent, setReplyContent] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(comment.content);
  };

  const handleSave = () => {
    if (editContent.trim() && editContent !== comment.content) {
      onUpdate(comment.id, editContent);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply(replyContent, comment.id);
      setReplyContent('');
      setIsReplying(false);
    }
  };

  const handleCancelReply = () => {
    setIsReplying(false);
    setReplyContent('');
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString();

  // Color system for comment tree levels
  const levelColors = [
    'border-blue-400',
    'border-green-400',
    'border-yellow-400',
    'border-purple-400',
    'border-pink-400',
    'border-red-400',
    'border-indigo-400',
    'border-teal-400',
  ];

  const borderColor = levelColors[level % levelColors.length];

  return (
    <div className={`border-l-2 ${borderColor} pl-3 sm:pl-4`}>
      <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
        {/* Comment Header */}
        <div className="flex items-start gap-3 mb-3">
          <img
            src={comment.avatar}
            alt={comment.name}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <div>
                <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                  {comment.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {formatDate(comment.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comment Content */}
        {isEditing ? (
          <div className="mb-4">
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
              rows={3}
            />
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3">
              <button
                onClick={handleSave}
                disabled={isUpdating || !editContent.trim()}
                className="flex-1 sm:flex-none bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors text-sm font-medium"
              >
                {isUpdating ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-800 text-sm sm:text-base leading-relaxed mb-4">
            {comment.content}
          </p>
        )}

        {/* Comment Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-gray-100">
          <div className="flex gap-3">
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              {isReplying ? 'Cancel Reply' : 'Reply'}
            </button>
            <button
              onClick={handleEdit}
              className="text-gray-600 hover:text-gray-800 text-sm transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(comment.id)}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-700 disabled:opacity-50 text-sm transition-colors"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Reply Form */}
        {isReplying && (
          <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Write a reply..."
              value={replyContent}
              onChange={e => setReplyContent(e.target.value)}
              rows={2}
            />
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3">
              <button
                onClick={handleReply}
                disabled={isCreating || !replyContent.trim()}
                className="flex-1 sm:flex-none bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm font-medium"
              >
                {isCreating ? 'Posting...' : 'Post Reply'}
              </button>
              <button
                onClick={handleCancelReply}
                className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Nested Comments */}
        {comment.children && comment.children.length > 0 && (
          <div className="mt-4 space-y-3 sm:space-y-4">
            {comment.children.map(child => (
              <CommentItem
                key={child.id}
                comment={child}
                onDelete={onDelete}
                onReply={onReply}
                onUpdate={onUpdate}
                isDeleting={isDeleting}
                isCreating={isCreating}
                isUpdating={isUpdating}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
