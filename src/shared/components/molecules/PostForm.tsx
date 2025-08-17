import React, { useState } from 'react';
import { Button, Textarea } from '../atoms';

interface PostFormProps {
  onSubmit: (data: { title: string; content: string }) => void;
  onCancel?: () => void;
  initialTitle?: string;
  initialContent?: string;
  submitText?: string;
  cancelText?: string;
  isLoading?: boolean;
  maxTitleLength?: number;
  maxContentLength?: number;
}

export function PostForm({
  onSubmit,
  onCancel,
  initialTitle = '',
  initialContent = '',
  submitText = 'Post',
  cancelText = 'Cancel',
  isLoading = false,
  maxTitleLength = 100,
  maxContentLength = 1000,
}: PostFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTitleError('');
    setContentError('');

    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }

    if (!content.trim()) {
      setContentError('Content is required');
      return;
    }

    onSubmit({ title: title.trim(), content: content.trim() });
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setTitleError('');
    setContentError('');
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title Field */}
      <div>
        <label
          htmlFor="post-title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Title
        </label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter post title..."
          maxLength={maxTitleLength}
          className={`block w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            titleError
              ? 'border-red-300 text-red-900 placeholder-red-300'
              : 'border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400'
          }`}
        />
        <div className="flex justify-between items-center mt-1">
          {titleError && <p className="text-sm text-red-600">{titleError}</p>}
          <span className="text-sm text-gray-500">
            {title.length}/{maxTitleLength}
          </span>
        </div>
      </div>

      {/* Content Field */}
      <div>
        <label
          htmlFor="post-content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Content
        </label>
        <Textarea
          id="post-content"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="What's on your mind?"
          error={contentError}
          maxLength={maxContentLength}
          showCharacterCount={false}
          rows={4}
          className="min-h-[120px]"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-3 pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
        )}

        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
          {submitText}
        </Button>
      </div>
    </form>
  );
}
