import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CommentItem } from '../CommentItem';
import type { CommentNode } from '../../../types';
import { vi, describe, it, expect } from 'vitest';

const mockComment: CommentNode = {
  id: '1',
  name: 'John Doe',
  avatar: 'https://example.com/avatar.jpg',
  content: 'This is a test comment',
  createdAt: '2023-01-01T00:00:00.000Z',
  parentId: null,
  children: [],
};

const mockProps = {
  comment: mockComment,
  onDelete: vi.fn(),
  onReply: vi.fn(),
  onUpdate: vi.fn(),
};

describe('CommentItem', () => {
  it('renders comment content', () => {
    render(<CommentItem {...mockProps} />);
    expect(screen.getByText('This is a test comment')).toBeDefined();
  });

  it('renders comment author name', () => {
    render(<CommentItem {...mockProps} />);
    expect(screen.getByText('John Doe')).toBeDefined();
  });

  it('renders comment avatar', () => {
    render(<CommentItem {...mockProps} />);
    const avatar = screen.getByAltText('John Doe');
    expect(avatar.getAttribute('src')).toBe('https://example.com/avatar.jpg');
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<CommentItem {...mockProps} />);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(mockProps.onDelete).toHaveBeenCalledWith('1');
  });

  it('shows reply form when reply button is clicked', () => {
    render(<CommentItem {...mockProps} />);
    const replyButton = screen.getByText('Reply');
    fireEvent.click(replyButton);
    expect(screen.getByPlaceholderText('Write a reply...')).toBeDefined();
  });

  it('shows edit form when edit button is clicked', () => {
    render(<CommentItem {...mockProps} />);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    expect(screen.getByPlaceholderText('Edit your comment...')).toBeDefined();
  });
});
