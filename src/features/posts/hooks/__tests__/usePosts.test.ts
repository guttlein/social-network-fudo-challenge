import { describe, it, expect, vi } from 'vitest';
import { useCreatePost, useDeletePost, useUpdatePost } from '../usePosts';

// Mock the API functions
vi.mock('@/shared/api', () => ({
  createPost: vi.fn(),
  deletePost: vi.fn(),
  updatePost: vi.fn(),
}));

describe('usePosts hooks', () => {
  it('should export useCreatePost function', () => {
    expect(typeof useCreatePost).toBe('function');
  });

  it('should export useDeletePost function', () => {
    expect(typeof useDeletePost).toBe('function');
  });

  it('should export useUpdatePost function', () => {
    expect(typeof useUpdatePost).toBe('function');
  });

  it('should have all required hooks available', () => {
    expect(useCreatePost).toBeDefined();
    expect(useDeletePost).toBeDefined();
    expect(useUpdatePost).toBeDefined();

    expect(typeof useCreatePost).toBe('function');
    expect(typeof useDeletePost).toBe('function');
    expect(typeof useUpdatePost).toBe('function');
  });
});
