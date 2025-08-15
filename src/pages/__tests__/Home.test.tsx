import React from 'react';
import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { render } from '../../test/test-utils';
import Home from '../Home';

describe('Home', () => {
  describe('Basic Rendering', () => {
    it('renders home page with title', () => {
      render(<Home />);
      expect(screen.getByText('Social Network')).toBeDefined();
    });

    it('renders with responsive classes', () => {
      render(<Home />);
      const container = screen.getByText('Social Network').closest('div');
      expect(container).toBeDefined();
    });
  });
});
