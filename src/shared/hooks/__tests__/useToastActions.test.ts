import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useToastActions } from '../useToastActions';
import { useToast } from '../../contexts/ToastContext';

// Mock the useToast hook
vi.mock('../../contexts/ToastContext');

const mockAddToast = vi.fn();
const mockUseToast = useToast as unknown as ReturnType<typeof vi.fn>;

describe('useToastActions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseToast.mockReturnValue({
      addToast: mockAddToast,
      toasts: [],
      removeToast: vi.fn(),
      clearToasts: vi.fn(),
    });
  });

  describe('Basic toast functions', () => {
    it('should call addToast with success type', () => {
      const { result } = renderHook(() => useToastActions());

      result.current.showSuccess('Success Title', 'Success message');

      expect(mockAddToast).toHaveBeenCalledWith({
        type: 'success',
        title: 'Success Title',
        message: 'Success message',
      });
    });

    it('should call addToast with error type', () => {
      const { result } = renderHook(() => useToastActions());

      result.current.showError('Error Title', 'Error message');

      expect(mockAddToast).toHaveBeenCalledWith({
        type: 'error',
        title: 'Error Title',
        message: 'Error message',
      });
    });

    it('should call addToast with warning type', () => {
      const { result } = renderHook(() => useToastActions());

      result.current.showWarning('Warning Title', 'Warning message');

      expect(mockAddToast).toHaveBeenCalledWith({
        type: 'warning',
        title: 'Warning Title',
        message: 'Warning message',
      });
    });

    it('should call addToast with info type', () => {
      const { result } = renderHook(() => useToastActions());

      result.current.showInfo('Info Title', 'Info message');

      expect(mockAddToast).toHaveBeenCalledWith({
        type: 'info',
        title: 'Info Title',
        message: 'Info message',
      });
    });

    it('should call addToast without message when not provided', () => {
      const { result } = renderHook(() => useToastActions());

      result.current.showSuccess('Success Title');

      expect(mockAddToast).toHaveBeenCalledWith({
        type: 'success',
        title: 'Success Title',
        message: undefined,
      });
    });
  });

  describe('Post-related toast functions', () => {
    it('should show post created toast', () => {
      const { result } = renderHook(() => useToastActions());

      result.current.showPostCreated();

      expect(mockAddToast).toHaveBeenCalledWith({
        type: 'success',
        title: 'Post Created',
        message: 'Your post has been published successfully!',
      });
    });

    it('should show post updated toast', () => {
      const { result } = renderHook(() => useToastActions());

      result.current.showPostUpdated();

      expect(mockAddToast).toHaveBeenCalledWith({
        type: 'success',
        title: 'Post Updated',
        message: 'Your post has been updated successfully!',
      });
    });

    it('should show post deleted toast', () => {
      const { result } = renderHook(() => useToastActions());

      result.current.showPostDeleted();

      expect(mockAddToast).toHaveBeenCalledWith({
        type: 'success',
        title: 'Post Deleted',
        message: 'Your post has been deleted successfully!',
      });
    });
  });

  describe('Comment-related toast functions', () => {
    it('should show comment created toast', () => {
      const { result } = renderHook(() => useToastActions());

      result.current.showCommentCreated();

      expect(mockAddToast).toHaveBeenCalledWith({
        type: 'success',
        title: 'Comment Added',
        message: 'Your comment has been posted successfully!',
      });
    });

    it('should show comment updated toast', () => {
      const { result } = renderHook(() => useToastActions());

      result.current.showCommentUpdated();

      expect(mockAddToast).toHaveBeenCalledWith({
        type: 'success',
        title: 'Comment Updated',
        message: 'Your comment has been updated successfully!',
      });
    });

    it('should show comment deleted toast', () => {
      const { result } = renderHook(() => useToastActions());

      result.current.showCommentDeleted();

      expect(mockAddToast).toHaveBeenCalledWith({
        type: 'success',
        title: 'Comment Deleted',
        message: 'Your comment has been deleted successfully!',
      });
    });
  });

  describe('Error toast functions', () => {
    it('should show error creating toast with capitalized item', () => {
      const { result } = renderHook(() => useToastActions());

      result.current.showErrorCreating('Post');

      expect(mockAddToast).toHaveBeenCalledWith({
        type: 'error',
        title: 'Error Creating Post',
        message: 'Failed to create post. Please try again.',
      });
    });

    it('should show error creating toast with lowercase item', () => {
      const { result } = renderHook(() => useToastActions());

      result.current.showErrorCreating('Comment');

      expect(mockAddToast).toHaveBeenCalledWith({
        type: 'error',
        title: 'Error Creating Comment',
        message: 'Failed to create comment. Please try again.',
      });
    });

    it('should show error updating toast', () => {
      const { result } = renderHook(() => useToastActions());

      result.current.showErrorUpdating('Post');

      expect(mockAddToast).toHaveBeenCalledWith({
        type: 'error',
        title: 'Error Updating Post',
        message: 'Failed to update post. Please try again.',
      });
    });

    it('should show error deleting toast', () => {
      const { result } = renderHook(() => useToastActions());

      result.current.showErrorDeleting('Comment');

      expect(mockAddToast).toHaveBeenCalledWith({
        type: 'error',
        title: 'Error Deleting Comment',
        message: 'Failed to delete comment. Please try again.',
      });
    });
  });

  describe('Returned functions', () => {
    it('should return all expected functions', () => {
      const { result } = renderHook(() => useToastActions());

      expect(result.current).toHaveProperty('showSuccess');
      expect(result.current).toHaveProperty('showError');
      expect(result.current).toHaveProperty('showWarning');
      expect(result.current).toHaveProperty('showInfo');
      expect(result.current).toHaveProperty('showPostCreated');
      expect(result.current).toHaveProperty('showPostUpdated');
      expect(result.current).toHaveProperty('showPostDeleted');
      expect(result.current).toHaveProperty('showCommentCreated');
      expect(result.current).toHaveProperty('showCommentUpdated');
      expect(result.current).toHaveProperty('showCommentDeleted');
      expect(result.current).toHaveProperty('showErrorCreating');
      expect(result.current).toHaveProperty('showErrorUpdating');
      expect(result.current).toHaveProperty('showErrorDeleting');
    });

    it('should return functions that are callable', () => {
      const { result } = renderHook(() => useToastActions());

      expect(typeof result.current.showSuccess).toBe('function');
      expect(typeof result.current.showError).toBe('function');
      expect(typeof result.current.showWarning).toBe('function');
      expect(typeof result.current.showInfo).toBe('function');
      expect(typeof result.current.showPostCreated).toBe('function');
      expect(typeof result.current.showPostUpdated).toBe('function');
      expect(typeof result.current.showPostDeleted).toBe('function');
      expect(typeof result.current.showCommentCreated).toBe('function');
      expect(typeof result.current.showCommentUpdated).toBe('function');
      expect(typeof result.current.showCommentDeleted).toBe('function');
      expect(typeof result.current.showErrorCreating).toBe('function');
      expect(typeof result.current.showErrorUpdating).toBe('function');
      expect(typeof result.current.showErrorDeleting).toBe('function');
    });
  });
});
