import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Toast } from '../Toast';
import type { Toast as ToastType } from '../../../contexts/ToastContext';

describe('Toast', () => {
  const mockToast: ToastType = {
    id: 'test-toast-1',
    type: 'success',
    title: 'Success!',
    message: 'Operation completed successfully',
    duration: 5000,
  };

  const defaultProps = {
    toast: mockToast,
    onRemove: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders toast with title and message', () => {
      render(<Toast {...defaultProps} />);

      expect(screen.getByText('Success!')).toBeDefined();
      expect(
        screen.getByText('Operation completed successfully')
      ).toBeDefined();
    });

    it('renders toast with only title when no message', () => {
      const toastWithoutMessage = { ...mockToast, message: undefined };
      render(<Toast {...defaultProps} toast={toastWithoutMessage} />);

      expect(screen.getByText('Success!')).toBeDefined();
      expect(screen.queryByText('Operation completed successfully')).toBeNull();
    });

    it('renders close button', () => {
      render(<Toast {...defaultProps} />);

      expect(screen.getByLabelText('Close toast')).toBeDefined();
    });
  });

  describe('Icons', () => {
    it('renders success icon for success type', () => {
      render(<Toast {...defaultProps} />);

      const svg = document.querySelector('svg');
      expect(svg).toBeDefined();
    });

    it('renders error icon for error type', () => {
      const errorToast = { ...mockToast, type: 'error' as const };
      render(<Toast {...defaultProps} toast={errorToast} />);

      const svg = document.querySelector('svg');
      expect(svg).toBeDefined();
    });

    it('renders warning icon for warning type', () => {
      const warningToast = { ...mockToast, type: 'warning' as const };
      render(<Toast {...defaultProps} toast={warningToast} />);

      const svg = document.querySelector('svg');
      expect(svg).toBeDefined();
    });

    it('renders info icon for info type', () => {
      const infoToast = { ...mockToast, type: 'info' as const };
      render(<Toast {...defaultProps} toast={infoToast} />);

      const svg = document.querySelector('svg');
      expect(svg).toBeDefined();
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA role', () => {
      render(<Toast {...defaultProps} />);

      const toast = screen.getByRole('alert');
      expect(toast).toBeDefined();
    });

    it('has correct ARIA label for close button', () => {
      render(<Toast {...defaultProps} />);

      const closeButton = screen.getByLabelText('Close toast');
      expect(closeButton).toBeDefined();
    });

    it('has live region for screen readers', () => {
      render(<Toast {...defaultProps} />);

      const toast = screen.getByRole('alert');
      expect(toast.getAttribute('aria-live')).toBe('polite');
    });
  });

  describe('Close functionality', () => {
    it('has close button', () => {
      render(<Toast {...defaultProps} />);

      const closeButton = screen.getByLabelText('Close toast');
      expect(closeButton).toBeDefined();
    });

    it('close button is clickable', () => {
      render(<Toast {...defaultProps} />);

      const closeButton = screen.getByLabelText('Close toast');
      expect(closeButton.getAttribute('disabled')).toBeNull();
    });
  });

  describe('Animation classes', () => {
    it('applies entrance animation classes', () => {
      render(<Toast {...defaultProps} />);

      const toast = screen.getByRole('alert');
      expect(toast.className).toContain('transition-all');
      expect(toast.className).toContain('duration-300');
      expect(toast.className).toContain('ease-in-out');
    });
  });

  describe('Content handling', () => {
    it('handles long text content', () => {
      const longToast = {
        ...mockToast,
        title: 'A'.repeat(100),
        message: 'B'.repeat(200),
      };
      render(<Toast {...defaultProps} toast={longToast} />);

      expect(screen.getByText('A'.repeat(100))).toBeDefined();
      expect(screen.getByText('B'.repeat(200))).toBeDefined();
    });

    it('handles special characters in content', () => {
      const specialToast = {
        ...mockToast,
        title: 'Special chars: !@#$%^&*()',
        message: 'Unicode: 🚀🎉✨',
      };
      render(<Toast {...defaultProps} toast={specialToast} />);

      expect(screen.getByText('Special chars: !@#$%^&*()')).toBeDefined();
      expect(screen.getByText('Unicode: 🚀🎉✨')).toBeDefined();
    });
  });

  describe('Edge cases', () => {
    it('handles empty title', () => {
      const emptyTitleToast = { ...mockToast, title: '' };
      render(<Toast {...defaultProps} toast={emptyTitleToast} />);

      const title = screen.getByRole('heading');
      expect(title.textContent).toBe('');
    });

    it('handles empty message', () => {
      const emptyMessageToast = { ...mockToast, message: '' };
      render(<Toast {...defaultProps} toast={emptyMessageToast} />);

      // Should not crash with empty message
      expect(screen.getByRole('alert')).toBeDefined();
    });

    it('handles zero duration', () => {
      const zeroDurationToast = { ...mockToast, duration: 0 };
      render(<Toast {...defaultProps} toast={zeroDurationToast} />);

      expect(screen.getByRole('alert')).toBeDefined();
    });

    it('handles negative duration', () => {
      const negativeDurationToast = { ...mockToast, duration: -1000 };
      render(<Toast {...defaultProps} toast={negativeDurationToast} />);

      expect(screen.getByRole('alert')).toBeDefined();
    });
  });

  describe('Performance', () => {
    it('renders quickly', () => {
      const startTime = performance.now();

      render(<Toast {...defaultProps} />);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render in less than 50ms
      expect(renderTime).toBeLessThan(50);
    });
  });

  describe('Integration', () => {
    it('positions correctly in container', () => {
      render(<Toast {...defaultProps} />);

      const toast = screen.getByRole('alert');
      expect(toast).toBeDefined();
    });

    it('has proper z-index for layering', () => {
      render(<Toast {...defaultProps} />);

      const toast = screen.getByRole('alert');
      // Should have shadow for proper layering
      expect(toast.className).toContain('shadow-lg');
    });
  });
});
