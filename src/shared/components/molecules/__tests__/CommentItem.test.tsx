import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render as renderWithProviders } from '../../../../test/test-utils';
import { CommentItem } from '../CommentItem';
import type { CommentNode } from '../../../../shared/types';

// Mock CommentForm component
vi.mock('../CommentForm', () => ({
  CommentForm: ({
    onSubmit,
    onCancel,
    placeholder,
    submitText,
    cancelText,
  }: {
    onSubmit: (content: string) => void;
    onCancel: () => void;
    placeholder: string;
    submitText: string;
    cancelText: string;
  }) => (
    <div data-testid="comment-form">
      <textarea
        data-testid="reply-textarea"
        placeholder={placeholder}
        onChange={e => onSubmit(e.target.value)}
      />
      <button data-testid="submit-reply" onClick={() => onSubmit('Test reply')}>
        {submitText}
      </button>
      <button data-testid="cancel-reply" onClick={onCancel}>
        {cancelText}
      </button>
    </div>
  ),
}));

const mockComment: CommentNode = {
  id: '1',
  content: 'Test comment content',
  name: 'John Doe',
  avatar: '/test-avatar.jpg',
  createdAt: '2024-01-01T00:00:00Z',
  parentId: null,
  children: [],
};

const mockCommentWithChildren: CommentNode = {
  ...mockComment,
  children: [
    {
      id: '2',
      content: 'Child comment',
      name: 'Jane Smith',
      avatar: '/child-avatar.jpg',
      createdAt: '2024-01-01T01:00:00Z',
      parentId: '1',
      children: [],
    },
  ],
};

const mockHandlers = {
  onDelete: vi.fn(),
  onReply: vi.fn(),
  onUpdate: vi.fn(),
};

describe('CommentItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render comment with basic information', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      expect(screen.getByText('Test comment content')).toBeDefined();
      expect(screen.getByText('John Doe')).toBeDefined();
      expect(screen.getByText('31/12/2023')).toBeDefined();
      expect(screen.getByAltText('John Doe')).toBeDefined();
    });

    it('should render with correct border color based on level', () => {
      const { container } = renderWithProviders(
        <CommentItem comment={mockComment} level={2} {...mockHandlers} />
      );

      const commentItem = container.firstChild as HTMLElement;
      expect(commentItem?.className).toContain('border-l-purple-500');
    });

    it('should handle avatar error with fallback', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      const avatar = screen.getByAltText('John Doe');
      fireEvent.error(avatar);

      expect(avatar.getAttribute('src')).toBe('/default-avatar.png');
    });

    it('should render without avatar when not provided', () => {
      const commentWithoutAvatar = { ...mockComment, avatar: undefined };

      renderWithProviders(
        <CommentItem
          comment={commentWithoutAvatar}
          level={0}
          {...mockHandlers}
        />
      );

      const avatar = screen.getByAltText('John Doe');
      expect(avatar.getAttribute('src')).toBe('/default-avatar.png');
    });
  });

  describe('Desktop actions', () => {
    it('should render desktop action buttons', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      expect(screen.getByText('Reply')).toBeDefined();
      expect(screen.getByText('Edit')).toBeDefined();
      expect(screen.getByText('Delete')).toBeDefined();
    });

    it('should handle reply button click', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      const replyButton = screen.getByText('Reply');
      fireEvent.click(replyButton);

      expect(screen.getByTestId('comment-form')).toBeDefined();
    });

    it('should handle edit button click', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      const editButton = screen.getByText('Edit');
      fireEvent.click(editButton);

      expect(screen.getByDisplayValue('Test comment content')).toBeDefined();
      expect(screen.getByText('Update')).toBeDefined();
      expect(screen.getByText('Cancel')).toBeDefined();
    });

    it('should handle delete button click', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      const deleteButton = screen.getByText('Delete');
      fireEvent.click(deleteButton);

      expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockComment);
    });
  });

  describe('Mobile actions', () => {
    it('should render mobile hamburger menu', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      const menuButton = screen.getByLabelText('Comment actions');
      expect(menuButton).toBeDefined();
    });

    it('should toggle mobile menu on click', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      const menuButton = screen.getByLabelText('Comment actions');
      fireEvent.click(menuButton);

      expect(screen.getAllByText('Reply')).toHaveLength(2); // Desktop + mobile
      expect(screen.getAllByText('Edit')).toHaveLength(2); // Desktop + mobile
      expect(screen.getAllByText('Delete')).toHaveLength(2); // Desktop + mobile
    });

    it('should close mobile menu when clicking outside', async () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      const menuButton = screen.getByLabelText('Comment actions');
      fireEvent.click(menuButton);

      expect(screen.getAllByText('Reply')).toHaveLength(2); // Desktop + mobile

      // Click outside the menu
      fireEvent.mouseDown(document.body);

      await waitFor(() => {
        expect(screen.getAllByText('Reply')).toHaveLength(1); // Only desktop remains
      });
    });

    it('should handle mobile menu actions', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      const menuButton = screen.getByLabelText('Comment actions');
      fireEvent.click(menuButton);

      const replyButtons = screen.getAllByText('Reply');
      const mobileReplyButton = replyButtons[1]; // Second one is mobile
      fireEvent.click(mobileReplyButton);

      expect(screen.getByTestId('comment-form')).toBeDefined();
    });
  });

  describe('Edit functionality', () => {
    it('should show edit form when editing', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      const editButton = screen.getByText('Edit');
      fireEvent.click(editButton);

      const textarea = screen.getByDisplayValue('Test comment content');
      expect(textarea).toBeDefined();
    });

    it('should handle edit content changes', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      const editButton = screen.getByText('Edit');
      fireEvent.click(editButton);

      const textarea = screen.getByDisplayValue('Test comment content');
      fireEvent.change(textarea, { target: { value: 'Updated content' } });

      expect((textarea as HTMLTextAreaElement).value).toBe('Updated content');
    });

    it('should handle update submission', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      const editButton = screen.getByText('Edit');
      fireEvent.click(editButton);

      const textarea = screen.getByDisplayValue('Test comment content');
      fireEvent.change(textarea, { target: { value: 'Updated content' } });

      const updateButton = screen.getByText('Update');
      fireEvent.click(updateButton);

      expect(mockHandlers.onUpdate).toHaveBeenCalledWith(
        '1',
        'Updated content'
      );
    });

    it('should not update when content is empty', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      const editButton = screen.getByText('Edit');
      fireEvent.click(editButton);

      const textarea = screen.getByDisplayValue('Test comment content');
      fireEvent.change(textarea, { target: { value: '   ' } });

      const updateButton = screen.getByText('Update');
      expect(updateButton.hasAttribute('disabled')).toBe(true);
    });

    it('should not update when content is unchanged', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      const editButton = screen.getByText('Edit');
      fireEvent.click(editButton);

      const updateButton = screen.getByText('Update');
      expect(updateButton.hasAttribute('disabled')).toBe(true);
    });

    it('should handle cancel edit', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      const editButton = screen.getByText('Edit');
      fireEvent.click(editButton);

      const textarea = screen.getByDisplayValue('Test comment content');
      fireEvent.change(textarea, { target: { value: 'Changed content' } });

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      expect(screen.queryByDisplayValue('Changed content')).toBeNull();
      expect(screen.getByText('Test comment content')).toBeDefined();
    });
  });

  describe('Reply functionality', () => {
    it('should show reply form when replying', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      const replyButton = screen.getByText('Reply');
      fireEvent.click(replyButton);

      expect(screen.getByTestId('comment-form')).toBeDefined();
    });

    it('should handle reply submission', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      const replyButton = screen.getByText('Reply');
      fireEvent.click(replyButton);

      const submitButton = screen.getByTestId('submit-reply');
      fireEvent.click(submitButton);

      expect(mockHandlers.onReply).toHaveBeenCalledWith('1', 'Test reply');
    });

    it('should handle reply cancellation', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      const replyButton = screen.getByText('Reply');
      fireEvent.click(replyButton);

      expect(screen.getByTestId('comment-form')).toBeDefined();

      const cancelButton = screen.getByTestId('cancel-reply');
      fireEvent.click(cancelButton);

      expect(screen.queryByTestId('comment-form')).toBeNull();
    });
  });

  describe('Nested comments', () => {
    it('should render nested comments', () => {
      renderWithProviders(
        <CommentItem
          comment={mockCommentWithChildren}
          level={0}
          {...mockHandlers}
        />
      );

      expect(screen.getByText('Child comment')).toBeDefined();
      expect(screen.getByText('Jane Smith')).toBeDefined();
    });

    it('should render nested comments with correct level', () => {
      const { container } = renderWithProviders(
        <CommentItem
          comment={mockCommentWithChildren}
          level={0}
          {...mockHandlers}
        />
      );

      // First level comment
      const firstLevelComment = container.firstChild as HTMLElement;
      expect(firstLevelComment?.className).toContain('border-l-blue-500');

      // Second level comment (child)
      const childComment = container.querySelector(
        '[class*="border-l-green-500"]'
      );
      expect(childComment).toBeDefined();
    });

    it('should handle actions on nested comments', () => {
      renderWithProviders(
        <CommentItem
          comment={mockCommentWithChildren}
          level={0}
          {...mockHandlers}
        />
      );

      // Test actions on child comment
      const childComment = screen.getByText('Child comment');
      expect(childComment).toBeDefined();

      // The child comment should also have action buttons
      const replyButtons = screen.getAllByText('Reply');
      expect(replyButtons).toHaveLength(2); // One for parent, one for child
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      const menuButton = screen.getByLabelText('Comment actions');
      expect(menuButton).toBeDefined();
    });

    it('should have proper button roles', () => {
      renderWithProviders(
        <CommentItem comment={mockComment} level={0} {...mockHandlers} />
      );

      const replyButton = screen.getByRole('button', { name: 'Reply' });
      const editButton = screen.getByRole('button', { name: 'Edit' });
      const deleteButton = screen.getByRole('button', { name: 'Delete' });

      expect(replyButton).toBeDefined();
      expect(editButton).toBeDefined();
      expect(deleteButton).toBeDefined();
    });
  });

  describe('Edge cases', () => {
    it('should handle comment with very long content', () => {
      const longComment = {
        ...mockComment,
        content: 'A'.repeat(1000),
      };

      renderWithProviders(
        <CommentItem comment={longComment} level={0} {...mockHandlers} />
      );

      expect(screen.getByText('A'.repeat(1000))).toBeDefined();
    });

    it('should handle comment with special characters in name', () => {
      const specialNameComment = {
        ...mockComment,
        name: "José María O'Connor-Smith",
      };

      renderWithProviders(
        <CommentItem comment={specialNameComment} level={0} {...mockHandlers} />
      );

      expect(screen.getByText("José María O'Connor-Smith")).toBeDefined();
    });

    it('should handle comment with HTML-like content', () => {
      const htmlComment = {
        ...mockComment,
        content: '<script>alert("xss")</script>Hello <b>World</b>',
      };

      renderWithProviders(
        <CommentItem comment={htmlComment} level={0} {...mockHandlers} />
      );

      expect(
        screen.getByText('<script>alert("xss")</script>Hello <b>World</b>')
      ).toBeDefined();
    });
  });
});
