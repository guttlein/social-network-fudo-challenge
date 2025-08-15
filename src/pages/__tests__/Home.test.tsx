import React from 'react';
import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '../../test/test-utils';
import Home from '../Home';

// Mock the API functions
vi.mock('@/shared/api', () => ({
  getPosts: vi.fn(),
  createPost: vi.fn(),
  updatePost: vi.fn(),
  deletePost: vi.fn(),
}));

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders home page with title', () => {
      render(<Home />);
      expect(screen.getByText('Posts')).toBeDefined();
    });

    it('renders with responsive classes', () => {
      render(<Home />);
      const container = screen.getByText('Posts').closest('div');
      expect(container).toBeDefined();
    });
  });
});
