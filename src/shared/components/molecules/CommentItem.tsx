import { useState } from 'react';
import type { CommentNode } from '../../types';

interface CommentItemProps {
  comment: CommentNode;
  onDelete: (commentId: string) => void;
  onReply: (content: string, parentId: string) => void;
  onUpdate: (commentId: string, content: string) => void;
  isDeleting?: boolean;
  isCreating?: boolean;
  isUpdating?: boolean;
  level?: number;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

const levelColors = [
  'border-blue-400',
  'border-green-400',
  'border-yellow-400',
  'border-purple-400',
  'border-pink-400',
  'border-red-400',
];

export function CommentItem({
  comment,
  onDelete,
  onReply,
  onUpdate,
  isDeleting,
  isCreating,
  isUpdating,
  level = 0,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    onReply(replyContent, comment.id);
    setReplyContent('');
    setIsReplying(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editContent.trim()) return;
    onUpdate(comment.id, editContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  const borderColor = levelColors[level % levelColors.length];

  return (
    <div className={`border-l-2 ${borderColor} pl-4`}>
      <div className="flex items-start gap-3">
        <img
          src={comment.avatar}
          alt={comment.name}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold">{comment.name}</span>
              <span className="text-xs text-gray-500 ml-2">
                {formatDate(comment.createdAt)}
              </span>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="mt-2">
              <textarea
                className="w-full border rounded p-2 mb-2"
                placeholder="Edit your comment..."
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                rows={2}
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50 text-sm"
                >
                  {isUpdating ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <p className="mt-1 text-gray-800">{comment.content}</p>
          )}

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Reply
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="text-green-600 hover:text-green-800 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(comment.id)}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>

          {isReplying && (
            <form onSubmit={handleReplySubmit} className="mt-3">
              <textarea
                className="w-full border rounded p-2 mb-2"
                placeholder="Write a reply..."
                value={replyContent}
                onChange={e => setReplyContent(e.target.value)}
                rows={2}
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isCreating}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
                >
                  {isCreating ? 'Posting...' : 'Post Reply'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsReplying(false)}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {comment.children && comment.children.length > 0 && (
        <div className="mt-4 space-y-4">
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
  );
}
