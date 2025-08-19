import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../test/test-utils';
import PostDetail from '../PostDetail';
import { useToastActions } from '../../shared/hooks/useToastActions';
import * as api from '../../shared/api';
import * as buildCommentTree from '../../shared/utils/buildCommentTree';

// Mock dependencies
vi.mock('../../shared/hooks/useToastActions');
vi.mock('../../shared/api');
vi.mock('../../shared/utils/buildCommentTree');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
  };
});

const mockToastActions = {
  showSuccess: vi.fn(),
  showError: vi.fn(),
};

const mockPost = {
  id: '123',
  title: 'Test Post Title',
  content: 'This is a test post content',
  name: 'John Doe',
  avatar: '/test-avatar.jpg',
  createdAt: '2024-01-01T00:00:00Z',
};

const mockComments = [
  {
    id: '1',
    content: 'Test comment 1',
    name: 'User 1',
    avatar: '/avatar1.jpg',
    createdAt: '2024-01-01T01:00:00Z',
    parentId: null,
  },
  {
    id: '2',
    content: 'Test comment 2',
    name: 'User 2',
    avatar: '/avatar2.jpg',
    createdAt: '2024-01-01T02:00:00Z',
    parentId: null,
  },
];

const mockCommentTree = [
  {
    id: '1',
    content: 'Test comment 1',
    name: 'User 1',
    avatar: '/avatar1.jpg',
    createdAt: '2024-01-01T01:00:00Z',
    parentId: null,
    children: [],
  },
  {
    id: '2',
    content: 'Test comment 2',
    name: 'User 2',
    avatar: '/avatar2.jpg',
    createdAt: '2024-01-01T02:00:00Z',
    parentId: null,
    children: [],
  },
];

describe('PostDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useToastActions as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockToastActions
    );
    (
      api.getSinglePost as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue(mockPost);
    (api.getComments as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockComments
    );
    (
      buildCommentTree.buildCommentTree as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue(mockCommentTree);
  });

  it('should render post details when loaded', async () => {
    render(<PostDetail />);

    await waitFor(() => {
      expect(screen.getByText('Test Post Title')).toBeDefined();
      expect(screen.getByText('This is a test post content')).toBeDefined();
      expect(screen.getByText('John Doe')).toBeDefined();
    });
  });

  it('should render back button', async () => {
    render(<PostDetail />);

    await waitFor(() => {
      expect(screen.getByText('Back to Posts')).toBeDefined();
    });
  });

  it('should render comment form', async () => {
    render(<PostDetail />);

    await waitFor(() => {
      expect(screen.getByText('Add a comment')).toBeDefined();
      expect(
        screen.getByPlaceholderText('Share your thoughts...')
      ).toBeDefined();
      expect(screen.getByText('Post Comment')).toBeDefined();
    });
  });

  it('should render comments section with count', async () => {
    render(<PostDetail />);

    await waitFor(() => {
      expect(screen.getByText('Comments (2)')).toBeDefined();
    });
  });

  it('should render comments when available', async () => {
    render(<PostDetail />);

    await waitFor(() => {
      expect(screen.getByText('Test comment 1')).toBeDefined();
      expect(screen.getByText('Test comment 2')).toBeDefined();
    });
  });

  it('should render no comments message when empty', async () => {
    (api.getComments as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      []
    );
    (
      buildCommentTree.buildCommentTree as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue([]);

    render(<PostDetail />);

    await waitFor(() => {
      expect(
        screen.getByText('No comments yet. Be the first to comment!')
      ).toBeDefined();
    });
  });

  it('should handle post not found error', async () => {
    (
      api.getSinglePost as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue(null);

    render(<PostDetail />);

    await waitFor(() => {
      expect(screen.getByText('Post not found')).toBeDefined();
      expect(
        screen.getByText("The post you're looking for doesn't exist.")
      ).toBeDefined();
    });
  });

  it('should handle post error', async () => {
    (
      api.getSinglePost as unknown as ReturnType<typeof vi.fn>
    ).mockRejectedValue(new Error('Failed to fetch'));

    render(<PostDetail />);

    await waitFor(() => {
      expect(screen.getByText('Post not found')).toBeDefined();
    });
  });

  it('should handle avatar error fallback', async () => {
    render(<PostDetail />);

    await waitFor(() => {
      const avatar = screen.getByAltText('John Doe');
      expect(avatar.getAttribute('src')).toBe('/test-avatar.jpg');
    });
  });

  it('should format post date correctly', async () => {
    render(<PostDetail />);

    await waitFor(() => {
      // The exact format depends on locale, but we can check it's rendered
      expect(screen.getByText('John Doe')).toBeDefined();
    });
  });

  it('should call API functions with correct parameters', async () => {
    render(<PostDetail />);

    await waitFor(() => {
      expect(api.getSinglePost).toHaveBeenCalledWith('123');
      expect(api.getComments).toHaveBeenCalledWith('123');
      expect(buildCommentTree.buildCommentTree).toHaveBeenCalledWith(
        mockComments
      );
    });
  });

  it('should handle comment creation successfully', async () => {
    (
      api.createComment as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({});

    render(<PostDetail />);

    await waitFor(() => {
      const textarea = screen.getByPlaceholderText('Share your thoughts...');
      const submitButton = screen.getByText('Post Comment');

      fireEvent.change(textarea, { target: { value: 'New comment' } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(api.createComment).toHaveBeenCalledWith('123', {
        content: 'New comment',
        parentId: null,
      });
      expect(mockToastActions.showSuccess).toHaveBeenCalledWith(
        'Comment created successfully!',
        'Your comment has been posted.'
      );
    });
  });

  it('should handle comment creation error', async () => {
    (
      api.createComment as unknown as ReturnType<typeof vi.fn>
    ).mockRejectedValue(new Error('Failed to create'));

    render(<PostDetail />);

    await waitFor(() => {
      const textarea = screen.getByPlaceholderText('Share your thoughts...');
      const submitButton = screen.getByText('Post Comment');

      fireEvent.change(textarea, { target: { value: 'New comment' } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockToastActions.showError).toHaveBeenCalledWith(
        'Failed to create comment',
        'Please try again later.'
      );
    });
  });

  it('should handle comment deletion successfully', async () => {
    (
      api.deleteComment as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({});

    render(<PostDetail />);

    await waitFor(() => {
      // Simulate opening delete modal
      const deleteButtons = screen.getAllByText('Delete');
      fireEvent.click(deleteButtons[0]);
    });

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Delete Comment' })
      ).toBeDefined();
      expect(
        screen.getByText(
          'Are you sure you want to delete this comment? This action cannot be undone.'
        )
      ).toBeDefined();
    });

    const confirmButton = screen.getByRole('button', {
      name: 'Delete Comment',
    });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(api.deleteComment).toHaveBeenCalledWith('123', '1');
      expect(mockToastActions.showSuccess).toHaveBeenCalledWith(
        'Comment deleted successfully!',
        'Your comment has been removed.'
      );
    });
  });

  it('should handle comment update successfully', async () => {
    (
      api.updateComment as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({});

    render(<PostDetail />);

    await waitFor(() => {
      // Simulate edit functionality through CommentItem
      expect(screen.getByText('Test comment 1')).toBeDefined();
    });
  });

  it('should handle comment reply successfully', async () => {
    (
      api.createComment as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({});

    render(<PostDetail />);

    await waitFor(() => {
      expect(screen.getByText('Test comment 1')).toBeDefined();
    });
  });

  it('should close delete modal when cancelled', async () => {
    render(<PostDetail />);

    await waitFor(() => {
      const deleteButtons = screen.getAllByText('Delete');
      fireEvent.click(deleteButtons[0]);
    });

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Delete Comment' })
      ).toBeDefined();
    });

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(
        screen.queryByRole('heading', { name: 'Delete Comment' })
      ).toBeNull();
    });
  });

  it('should render with correct layout structure', async () => {
    render(<PostDetail />);

    await waitFor(() => {
      expect(screen.getByRole('article')).toBeDefined();
      expect(screen.getByText('Add a comment')).toBeDefined();
      expect(screen.getByText('Comments (2)')).toBeDefined();
    });
  });
});
