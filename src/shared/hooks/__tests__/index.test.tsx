import { describe, it, expect } from 'vitest';

describe('Hooks index exports', () => {
  it('should export useThresholdFetch hook', async () => {
    const { useThresholdFetch } = await import('../index');
    expect(useThresholdFetch).toBeDefined();
  });

  it('should export useInfinitePosts hook', async () => {
    const { useInfinitePosts } = await import('../index');
    expect(useInfinitePosts).toBeDefined();
  });

  it('should export useToastActions hook', async () => {
    const { useToastActions } = await import('../index');
    expect(useToastActions).toBeDefined();
  });
});
