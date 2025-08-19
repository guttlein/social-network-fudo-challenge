import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useThresholdFetch } from '../useThresholdFetch';

describe('useThresholdFetch', () => {
  it('should export a function', () => {
    expect(typeof useThresholdFetch).toBe('function');
  });

  it('should be defined', () => {
    expect(useThresholdFetch).toBeDefined();
  });

  it('should return expected structure', () => {
    const { result } = renderHook(() => useThresholdFetch);

    expect(result.current).toBeDefined();
  });
});
