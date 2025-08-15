import { useState } from 'react';
import { Button, Textarea } from '../atoms';
import { CommentForm } from './CommentForm';
import type { CommentNode } from '@/shared/types';

interface CommentItemProps {
  comment: CommentNode;
  level: number;
  onDelete: (id: string) => void;
  onReply: (parentId: string, content: string) => void;
  onUpdate: (id: string, content: string) => void;
}

export function CommentItem({
  comment,
  level,
  onDelete,
  onReply,
  onUpdate,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(comment.content);
  };

  const handleUpdate = () => {
    if (editContent.trim() && editContent !== comment.content) {
      onUpdate(comment.id, editContent.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  const handleReply = (content: string) => {
    onReply(comment.id, content);
    setIsReplying(false);
  };

  const handleCancelReply = () => {
    setIsReplying(false);
  };

  const borderColors = [
    'border-l-blue-500',
    'border-l-green-500',
    'border-l-purple-500',
    'border-l-orange-500',
    'border-l-pink-500',
  ];

  const borderColor = borderColors[level % borderColors.length];

  return (
    <div className={`border-l-4 ${borderColor} pl-4 mb-4`}>
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        {/* Comment Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <img
              src={comment.avatar || '/default-avatar.png'}
              alt={comment.name}
              className="w-8 h-8 rounded-full object-cover"
              onError={e => {
                e.currentTarget.src = '/default-avatar.png';
              }}
            />
            <div>
              <h4 className="font-medium text-gray-900 text-sm">
                {comment.name}
              </h4>
              <p className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsReplying(!isReplying)}
              className="text-xs"
            >
              Reply
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="text-xs"
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(comment.id)}
              className="text-xs"
            >
              Delete
            </Button>
          </div>
        </div>

        {/* Comment Content */}
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
              placeholder="Edit your comment..."
              maxLength={500}
              showCharacterCount
              rows={3}
            />
            <div className="flex items-center justify-end space-x-2">
              <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleUpdate}
                disabled={
                  !editContent.trim() || editContent === comment.content
                }
              >
                Update
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-800 text-sm leading-relaxed">
            {comment.content}
          </p>
        )}

        {/* Reply Form */}
        {isReplying && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <CommentForm
              onSubmit={handleReply}
              onCancel={handleCancelReply}
              placeholder="Write a reply..."
              submitText="Reply"
              cancelText="Cancel"
              maxLength={300}
            />
          </div>
        )}

        {/* Nested Comments */}
        {comment.children && comment.children.length > 0 && (
          <div className="mt-4 space-y-3">
            {comment.children.map(child => (
              <CommentItem
                key={child.id}
                comment={child}
                level={level + 1}
                onDelete={onDelete}
                onReply={onReply}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
