import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Modal } from '../Modal';

// Mock createPortal
vi.mock('react-dom', () => ({
  createPortal: (children: React.ReactNode) => children,
}));

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'Test Modal',
    children: <div>Modal content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders when open', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByText('Test Modal')).toBeDefined();
      expect(screen.getByText('Modal content')).toBeDefined();
      expect(screen.getByTestId('modal-backdrop')).toBeDefined();
      expect(screen.getByTestId('modal-content')).toBeDefined();
    });

    it('does not render when closed', () => {
      render(<Modal {...defaultProps} isOpen={false} />);

      expect(screen.queryByText('Test Modal')).toBeNull();
      expect(screen.queryByTestId('modal-backdrop')).toBeNull();
    });

    it('renders with custom title', () => {
      render(<Modal {...defaultProps} title="Custom Title" />);

      expect(screen.getByText('Custom Title')).toBeDefined();
    });

    it('renders with custom children', () => {
      render(
        <Modal {...defaultProps}>
          <button>Custom Button</button>
        </Modal>
      );

      expect(
        screen.getByRole('button', { name: 'Custom Button' })
      ).toBeDefined();
    });

    it('renders close button', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByLabelText('Close modal')).toBeDefined();
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(<Modal {...defaultProps} />);

      const modal = screen.getByTestId('modal-content');
      expect(modal.getAttribute('role')).toBe('dialog');
      expect(modal.getAttribute('aria-modal')).toBe('true');
      expect(modal.getAttribute('aria-labelledby')).toBe('modal-title');
      expect(modal.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Close functionality', () => {
    it('calls onClose when close button is clicked', () => {
      render(<Modal {...defaultProps} />);

      const closeButton = screen.getByLabelText('Close modal');
      fireEvent.click(closeButton);

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when backdrop is clicked', () => {
      render(<Modal {...defaultProps} />);

      const backdrop = screen.getByTestId('modal-backdrop');
      fireEvent.click(backdrop);

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when Escape key is pressed', () => {
      render(<Modal {...defaultProps} />);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when content is clicked', () => {
      render(<Modal {...defaultProps} />);

      const content = screen.getByTestId('modal-content');
      fireEvent.click(content);

      expect(defaultProps.onClose).not.toHaveBeenCalled();
    });
  });

  describe('Focus management', () => {
    it('focuses modal on mount', () => {
      render(<Modal {...defaultProps} />);

      const modal = screen.getByTestId('modal-content');
      expect(document.activeElement).toBe(modal);
    });
  });

  describe('Edge cases', () => {
    it('handles empty title', () => {
      render(<Modal {...defaultProps} title="" />);

      const title = screen.getByRole('heading');
      expect(title.textContent).toBe('');
    });

    it('handles null children', () => {
      render(<Modal {...defaultProps} children={null} />);

      expect(screen.getByTestId('modal-content')).toBeDefined();
    });

    it('handles rapid open/close cycles', () => {
      const { rerender } = render(<Modal {...defaultProps} />);

      rerender(<Modal {...defaultProps} isOpen={false} />);
      rerender(<Modal {...defaultProps} isOpen={true} />);

      expect(screen.getByTestId('modal-content')).toBeDefined();
    });
  });

  describe('Performance', () => {
    it('renders quickly', () => {
      const startTime = performance.now();

      render(<Modal {...defaultProps} />);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render in less than 100ms
      expect(renderTime).toBeLessThan(100);
    });

    it('handles large content efficiently', () => {
      const largeContent = Array.from({ length: 1000 }, (_, i) => (
        <div key={i}>Content item {i}</div>
      ));

      const startTime = performance.now();

      render(<Modal {...defaultProps} children={largeContent} />);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render large content in less than 300ms
      expect(renderTime).toBeLessThan(300);
    });
  });
});
