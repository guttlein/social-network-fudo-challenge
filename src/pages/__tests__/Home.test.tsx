import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '../../test/test-utils';
import Home from '../Home';

// Mock de la API
vi.mock('@/shared/api', () => ({
  getPosts: vi.fn(() =>
    Promise.resolve([
      {
        id: '1',
        name: 'Test User',
        avatar: 'https://example.com/avatar.jpg',
        content: 'Test post content',
        createdAt: '2024-01-01T00:00:00.000Z',
      },
    ])
  ),
}));

describe('Home', () => {
  it('renders posts correctly', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Test post content')).toBeDefined();
      expect(screen.getByText('Test User')).toBeDefined();
    });
  });

  it('shows create post form', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('New post...')).toBeDefined();
      expect(screen.getByText('Create Post')).toBeDefined();
    });
  });

  it('displays post actions', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('See Details')).toBeDefined();
      expect(screen.getByText('Edit')).toBeDefined();
      expect(screen.getByText('Delete')).toBeDefined();
    });
  });
});
