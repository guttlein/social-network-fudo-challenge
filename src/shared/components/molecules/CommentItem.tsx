import { useState, useEffect, useRef } from 'react';
import { Button, Textarea } from '../atoms';
import { CommentForm } from './CommentForm';
import type { CommentNode } from '@/shared/types';

interface CommentItemProps {
  comment: CommentNode;
  level: number;
  onDelete: (comment: CommentNode) => void;
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(comment.content);
    setIsMenuOpen(false);
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

  const handleDelete = () => {
    onDelete(comment);
    setIsMenuOpen(false);
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
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <img
              src={comment.avatar || '/default-avatar.png'}
              alt={comment.name}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              onError={e => {
                e.currentTarget.src = '/default-avatar.png';
              }}
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-medium text-gray-900 text-sm truncate">
                {comment.name}
              </h4>
              <p className="text-xs text-gray-500 truncate">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Desktop: Show all buttons */}
          <div className="hidden md:flex items-center space-x-2 flex-shrink-0">
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
              onClick={handleDelete}
              className="text-xs"
            >
              Delete
            </Button>
          </div>

          {/* Mobile: Show hamburger menu */}
          <div className="md:hidden relative flex-shrink-0" ref={menuRef}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-xs p-2"
              aria-label="Comment actions"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </Button>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  <button
                    onClick={() => setIsReplying(!isReplying)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  >
                    Reply
                  </button>
                  <button
                    onClick={handleEdit}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 focus:bg-red-50 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
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
          <div>
            <p className="text-gray-800 text-sm leading-relaxed break-words overflow-wrap-anywhere">
              {comment.content}
            </p>
          </div>
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
