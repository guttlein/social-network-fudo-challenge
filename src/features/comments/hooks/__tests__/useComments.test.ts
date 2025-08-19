import { describe, it, expect, vi } from 'vitest';
import {
  useCreateComment,
  useDeleteComment,
  useUpdateComment,
} from '../useComments';

// Mock the API functions
vi.mock('@/shared/api', () => ({
  createComment: vi.fn(),
  deleteComment: vi.fn(),
  updateComment: vi.fn(),
}));

describe('useComments hooks', () => {
  it('should export useCreateComment function', () => {
    expect(typeof useCreateComment).toBe('function');
  });

  it('should export useDeleteComment function', () => {
    expect(typeof useDeleteComment).toBe('function');
  });

  it('should export useUpdateComment function', () => {
    expect(typeof useUpdateComment).toBe('function');
  });

  it('should have all required hooks available', () => {
    expect(useCreateComment).toBeDefined();
    expect(useDeleteComment).toBeDefined();
    expect(useUpdateComment).toBeDefined();

    expect(typeof useCreateComment).toBe('function');
    expect(typeof useDeleteComment).toBe('function');
    expect(typeof useUpdateComment).toBe('function');
  });
});
