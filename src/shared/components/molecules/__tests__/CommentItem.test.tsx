import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '../../../../test/test-utils';
import { CommentItem } from '../CommentItem';
import type { CommentNode } from '../../../../shared/types';

// Mock the API functions
vi.mock('@/shared/api', () => ({
  updateComment: vi.fn(),
  deleteComment: vi.fn(),
  createComment: vi.fn(),
}));

describe('CommentItem', () => {
  const mockComment: CommentNode = {
    id: '1',
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
    content: 'This is a test comment',
    createdAt: '2022-12-31T09:00:00.000Z',
    parentId: null,
    children: [],
  };

  const mockProps = {
    comment: mockComment,
    level: 0,
    onDelete: vi.fn(),
    onReply: vi.fn(),
    onUpdate: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders comment content', () => {
      render(<CommentItem {...mockProps} />);
      expect(screen.getByText('This is a test comment')).toBeDefined();
    });

    it('renders author name', () => {
      render(<CommentItem {...mockProps} />);
      expect(screen.getByText('John Doe')).toBeDefined();
    });

    it('renders avatar image', () => {
      render(<CommentItem {...mockProps} />);
      const avatar = screen.getByAltText('John Doe');
      expect(avatar).toBeDefined();
      expect(avatar.getAttribute('src')).toBe('https://example.com/avatar.jpg');
    });

    it('renders action buttons', () => {
      render(<CommentItem {...mockProps} />);
      expect(screen.getByText('Reply')).toBeDefined();
      expect(screen.getByText('Edit')).toBeDefined();
      expect(screen.getByText('Delete')).toBeDefined();
    });
  });

  describe('Nested Comments', () => {
    it('renders nested comment with correct indentation', () => {
      const nestedComment = { ...mockComment, id: '2', parentId: '1' };
      const nestedProps = { ...mockProps, comment: nestedComment, level: 1 };

      render(<CommentItem {...nestedProps} />);

      const commentContainer = screen
        .getByText('This is a test comment')
        .closest('div');
      expect(commentContainer).toBeDefined();
    });

    it('renders deeply nested comment', () => {
      const deepComment = { ...mockComment, id: '3', parentId: '2' };
      const deepProps = { ...mockProps, comment: deepComment, level: 2 };

      render(<CommentItem {...deepProps} />);

      expect(screen.getByText('This is a test comment')).toBeDefined();
    });
  });

  describe('Reply Functionality', () => {
    it('shows reply form when reply button is clicked', () => {
      render(<CommentItem {...mockProps} />);

      const replyButton = screen.getByText('Reply');
      fireEvent.click(replyButton);

      expect(screen.getByPlaceholderText('Write a reply...')).toBeDefined();
    });

    it('hides reply form when cancel is clicked', () => {
      render(<CommentItem {...mockProps} />);

      const replyButton = screen.getByText('Reply');
      fireEvent.click(replyButton);

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      expect(screen.queryByPlaceholderText('Write a reply...')).toBeNull();
    });
  });

  describe('Edit Functionality', () => {
    it('shows edit form when edit button is clicked', () => {
      render(<CommentItem {...mockProps} />);

      const editButton = screen.getByText('Edit');
      fireEvent.click(editButton);

      expect(screen.getByDisplayValue('This is a test comment')).toBeDefined();
    });

    it('hides edit form when cancel is clicked', () => {
      render(<CommentItem {...mockProps} />);

      const editButton = screen.getByText('Edit');
      fireEvent.click(editButton);

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      expect(screen.queryByDisplayValue('This is a test comment')).toBeNull();
    });
  });

  describe('Delete Functionality', () => {
    it('calls onDelete when delete button is clicked', () => {
      render(<CommentItem {...mockProps} />);

      const deleteButton = screen.getByText('Delete');
      fireEvent.click(deleteButton);

      expect(mockProps.onDelete).toHaveBeenCalledWith(mockComment);
    });
  });

  describe('Edge Cases', () => {
    it('handles comment without avatar', () => {
      const commentWithoutAvatar = { ...mockComment, avatar: '' };
      const propsWithoutAvatar = {
        ...mockProps,
        comment: commentWithoutAvatar,
      };

      render(<CommentItem {...propsWithoutAvatar} />);

      // Should render without crashing
      expect(screen.getByText('This is a test comment')).toBeDefined();
    });

    it('handles long comment content', () => {
      const longComment = {
        ...mockComment,
        content: 'A'.repeat(500),
      };
      const longProps = { ...mockProps, comment: longComment };

      render(<CommentItem {...longProps} />);

      expect(screen.getByText('A'.repeat(500))).toBeDefined();
    });
  });

  describe('Orphaned Comments (Parent Deleted)', () => {
    it('shows orphaned comment indicator when comment has parentId but is at level 0', () => {
      const orphanedComment: CommentNode = {
        ...mockComment,
        id: '2',
        parentId: 'deleted-parent-id',
        content: 'This is an orphaned reply',
        isOrphaned: true,
      };
      const orphanedProps = {
        ...mockProps,
        comment: orphanedComment,
        level: 0,
      };

      render(<CommentItem {...orphanedProps} />);

      // Should show the orphaned comment indicator
      expect(
        screen.getByText(
          /This comment was a reply to another comment that has been deleted/
        )
      ).toBeDefined();
      expect(screen.getByText('This is an orphaned reply')).toBeDefined();
    });

    it('does not show orphaned comment indicator when comment has parentId but is not at level 0', () => {
      const nestedComment: CommentNode = {
        ...mockComment,
        id: '2',
        parentId: 'parent-id',
        content: 'This is a nested reply',
        isOrphaned: false,
      };
      const nestedProps = {
        ...mockProps,
        comment: nestedComment,
        level: 1,
      };

      render(<CommentItem {...nestedProps} />);

      // Should NOT show the orphaned comment indicator for nested comments
      expect(
        screen.queryByText(
          /This comment was a reply to another comment that has been deleted/
        )
      ).toBeNull();
      expect(screen.getByText('This is a nested reply')).toBeDefined();
    });

    it('does not show orphaned comment indicator when comment has no parentId', () => {
      const rootComment: CommentNode = {
        ...mockComment,
        id: '1',
        parentId: null,
        content: 'This is a root comment',
        isOrphaned: false,
      };
      const rootProps = {
        ...mockProps,
        comment: rootComment,
        level: 0,
      };

      render(<CommentItem {...rootProps} />);

      // Should NOT show the orphaned comment indicator for root comments
      expect(
        screen.queryByText(
          /This comment was a reply to another comment that has been deleted/
        )
      ).toBeNull();
      expect(screen.getByText('This is a root comment')).toBeDefined();
    });

    it('maintains all functionality for orphaned comments', () => {
      const orphanedComment: CommentNode = {
        ...mockComment,
        id: '2',
        parentId: 'deleted-parent-id',
        content: 'This is an orphaned reply',
        isOrphaned: true,
      };
      const orphanedProps = {
        ...mockProps,
        comment: orphanedComment,
        level: 0,
      };

      render(<CommentItem {...orphanedProps} />);

      // Should still have all action buttons
      expect(screen.getByText('Reply')).toBeDefined();
      expect(screen.getByText('Edit')).toBeDefined();
      expect(screen.getByText('Delete')).toBeDefined();

      // Should still be able to reply
      const replyButton = screen.getByText('Reply');
      fireEvent.click(replyButton);
      expect(screen.getByPlaceholderText('Write a reply...')).toBeDefined();

      // Should still be able to edit
      const editButton = screen.getByText('Edit');
      fireEvent.click(editButton);
      expect(
        screen.getByDisplayValue('This is an orphaned reply')
      ).toBeDefined();

      // Should still be able to delete
      const deleteButton = screen.getByText('Delete');
      fireEvent.click(deleteButton);
      expect(mockProps.onDelete).toHaveBeenCalledWith(orphanedComment);
    });
  });
});
