import React, { useState } from 'react';
import { Button, Textarea } from '../atoms';

interface CommentFormProps {
  onSubmit: (content: string) => void;
  onCancel?: () => void;
  initialValue?: string;
  placeholder?: string;
  submitText?: string;
  cancelText?: string;
  isLoading?: boolean;
  maxLength?: number;
}

export function CommentForm({
  onSubmit,
  onCancel,
  initialValue = '',
  placeholder = 'Write a comment...',
  submitText = 'Post',
  cancelText = 'Cancel',
  isLoading = false,
  maxLength = 500,
}: CommentFormProps) {
  const [content, setContent] = useState(initialValue);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    if (content.trim().length < 3) {
      setError('Comment must be at least 3 characters long');
      return;
    }

    setError('');
    onSubmit(content.trim());
    setContent('');
  };

  const handleCancel = () => {
    setContent('');
    setError('');
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder={placeholder}
        error={error}
        maxLength={maxLength}
        showCharacterCount
        rows={3}
        className="min-h-[80px]"
      />

      <div className="flex items-center justify-end space-x-3">
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

        <Button
          type="submit"
          isLoading={isLoading}
          disabled={!content.trim() || isLoading}
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
}
