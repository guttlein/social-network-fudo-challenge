import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '../../../../test/test-utils';
import { Textarea } from '../Textarea';

describe('Textarea', () => {
  describe('Basic Rendering', () => {
    it('renders textarea with placeholder', () => {
      render(<Textarea placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeDefined();
    });

    it('renders with label when provided', () => {
      render(<Textarea label="Description" />);
      expect(screen.getByText('Description')).toBeDefined();
    });

    it('renders without label when not provided', () => {
      render(<Textarea />);
      expect(screen.queryByText('Description')).toBeNull();
    });
  });

  describe('Character Count', () => {
    it('shows character count when showCharacterCount is true', () => {
      render(<Textarea showCharacterCount maxLength={100} value="Hello" />);
      expect(screen.getByText('5/100')).toBeDefined();
    });

    it('does not show character count when showCharacterCount is false', () => {
      render(
        <Textarea showCharacterCount={false} maxLength={100} value="Hello" />
      );
      expect(screen.queryByText('5/100')).toBeNull();
    });

    it('shows warning color when approaching max length', () => {
      const longText = 'A'.repeat(95);
      render(<Textarea showCharacterCount maxLength={100} value={longText} />);
      const counter = screen.getByText('95/100');
      expect(counter.getAttribute('class')).toContain('text-orange-600');
    });
  });

  describe('Error State', () => {
    it('shows error message when error is provided', () => {
      render(<Textarea error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeDefined();
      expect(
        screen.getByText('This field is required').getAttribute('class')
      ).toContain('text-red-600');
    });

    it('applies error styling to textarea', () => {
      render(<Textarea error="Error message" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea.getAttribute('class')).toContain('border-red-300');
    });
  });

  describe('Helper Text', () => {
    it('shows helper text when provided', () => {
      render(<Textarea helperText="Optional field" />);
      expect(screen.getByText('Optional field')).toBeDefined();
      expect(
        screen.getByText('Optional field').getAttribute('class')
      ).toContain('text-gray-500');
    });

    it('does not show helper text when error is present', () => {
      render(<Textarea helperText="Helper text" error="Error message" />);
      expect(screen.queryByText('Helper text')).toBeNull();
    });
  });

  describe('Interaction', () => {
    it('calls onChange when text is entered', () => {
      const handleChange = vi.fn();
      render(<Textarea onChange={handleChange} />);

      const textarea = screen.getByRole('textbox');
      fireEvent.change(textarea, { target: { value: 'New text' } });

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('forwards value prop correctly', () => {
      render(<Textarea defaultValue="Initial value" />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.value).toBe('Initial value');
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      render(<Textarea className="custom-class" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea.getAttribute('class')).toContain('custom-class');
    });
  });
});
