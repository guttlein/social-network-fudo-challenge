import { describe, it, expect } from 'vitest';

describe('Molecules index exports', () => {
  it('should export CommentItem component', async () => {
    const { CommentItem } = await import('../index');
    expect(CommentItem).toBeDefined();
  });

  it('should export PostCard component', async () => {
    const { PostCard } = await import('../index');
    expect(PostCard).toBeDefined();
  });

  it('should export Modal component', async () => {
    const { Modal } = await import('../index');
    expect(Modal).toBeDefined();
  });

  it('should export Toast component', async () => {
    const { Toast } = await import('../index');
    expect(Toast).toBeDefined();
  });
});
