import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '../../../../test/test-utils';
import { Button } from '../Button';

describe('Button', () => {
  describe('Basic Rendering', () => {
    it('renders button with children', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeDefined();
    });

    it('renders with default variant and size', () => {
      render(<Button>Default Button</Button>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('class')).toContain('bg-blue-600');
      expect(button.getAttribute('class')).toContain('px-4');
      expect(button.getAttribute('class')).toContain('py-2');
      expect(button.getAttribute('class')).toContain('text-sm');
    });
  });

  describe('Variants', () => {
    it('renders primary variant correctly', () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('class')).toContain('bg-blue-600');
      expect(button.getAttribute('class')).toContain('text-white');
    });

    it('renders secondary variant correctly', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('class')).toContain('bg-gray-200');
      expect(button.getAttribute('class')).toContain('text-gray-900');
    });

    it('renders danger variant correctly', () => {
      render(<Button variant="danger">Danger</Button>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('class')).toContain('bg-red-600');
      expect(button.getAttribute('class')).toContain('text-white');
    });

    it('renders ghost variant correctly', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('class')).toContain('bg-transparent');
      expect(button.getAttribute('class')).toContain('border-gray-300');
    });
  });

  describe('Sizes', () => {
    it('renders small size correctly', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('class')).toContain('px-3');
      expect(button.getAttribute('class')).toContain('py-1.5');
      expect(button.getAttribute('class')).toContain('text-sm');
    });

    it('renders large size correctly', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('class')).toContain('px-6');
      expect(button.getAttribute('class')).toContain('py-3');
      expect(button.getAttribute('class')).toContain('text-base');
    });
  });

  describe('Loading State', () => {
    it('shows loading spinner when isLoading is true', () => {
      render(<Button isLoading>Loading</Button>);
      const spinner = screen.getByRole('button').querySelector('svg');
      expect(spinner).toBeDefined();
      expect(spinner?.getAttribute('class')).toContain('animate-spin');
    });

    it('disables button when loading', () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('disabled')).not.toBeNull();
    });
  });

  describe('Interaction', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('forwards additional props', () => {
      render(
        <Button data-testid="custom-button" aria-label="Custom">
          Custom
        </Button>
      );
      const button = screen.getByTestId('custom-button');
      expect(button.getAttribute('aria-label')).toBe('Custom');
    });
  });
});
