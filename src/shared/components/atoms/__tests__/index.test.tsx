import { describe, it, expect } from 'vitest';

describe('Atoms index exports', () => {
  it('should export Button component', async () => {
    const { Button } = await import('../index');
    expect(Button).toBeDefined();
  });

  it('should export Textarea component', async () => {
    const { Textarea } = await import('../index');
    expect(Textarea).toBeDefined();
  });

  it('should export Skeleton component', async () => {
    const { Skeleton } = await import('../index');
    expect(Skeleton).toBeDefined();
  });
});
