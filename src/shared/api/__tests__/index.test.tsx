import { describe, it, expect, vi } from 'vitest';
import { beforeEach } from 'vitest';

// Mock fetch globally
(globalThis as unknown as { fetch: ReturnType<typeof vi.fn> }).fetch = vi.fn();

describe('API functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should have getPosts function', async () => {
    const { getPosts } = await import('../index');
    expect(typeof getPosts).toBe('function');
  });

  it('should have getSinglePost function', async () => {
    const { getSinglePost } = await import('../index');
    expect(typeof getSinglePost).toBe('function');
  });

  it('should have createPost function', async () => {
    const { createPost } = await import('../index');
    expect(typeof createPost).toBe('function');
  });

  it('should have deletePost function', async () => {
    const { deletePost } = await import('../index');
    expect(typeof deletePost).toBe('function');
  });

  it('should have getComments function', async () => {
    const { getComments } = await import('../index');
    expect(typeof getComments).toBe('function');
  });

  it('should have createComment function', async () => {
    const { createComment } = await import('../index');
    expect(typeof createComment).toBe('function');
  });

  it('should have deleteComment function', async () => {
    const { deleteComment } = await import('../index');
    expect(typeof deleteComment).toBe('function');
  });

  it('should have updatePost function', async () => {
    const { updatePost } = await import('../index');
    expect(typeof updatePost).toBe('function');
  });

  it('should have updateComment function', async () => {
    const { updateComment } = await import('../index');
    expect(typeof updateComment).toBe('function');
  });
});
