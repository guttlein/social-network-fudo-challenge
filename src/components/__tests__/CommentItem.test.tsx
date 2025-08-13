import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { CommentItem } from '../CommentItem'
import type { CommentNode } from '../../types'

// Mock data para testing
const mockComment: CommentNode = {
  id: '1',
  name: 'Test User',
  avatar: 'https://example.com/avatar.jpg',
  content: 'Test comment content',
  createdAt: '2024-01-01T00:00:00.000Z',
  parentId: null,
  children: []
}

const mockProps = {
  comment: mockComment,
  onDelete: vi.fn(),
  onReply: vi.fn(),
  onUpdate: vi.fn(),
  isDeleting: false,
  isCreating: false,
  isUpdating: false,
  level: 0
}

describe('CommentItem', () => {
  it('renders comment content correctly', () => {
    render(<CommentItem {...mockProps} />)
    
    expect(screen.getByText('Test comment content')).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })

  it('shows edit form when edit button is clicked', () => {
    render(<CommentItem {...mockProps} />)
    
    const editButton = screen.getByText('Edit')
    fireEvent.click(editButton)
    
    expect(screen.getByDisplayValue('Test comment content')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('shows reply form when reply button is clicked', () => {
    render(<CommentItem {...mockProps} />)
    
    const replyButton = screen.getByText('Reply')
    fireEvent.click(replyButton)
    
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByDisplayValue('')).toBeInTheDocument()
  })

  it('calls onDelete when delete button is clicked', () => {
    render(<CommentItem {...mockProps} />)
    
    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)
    
    expect(mockProps.onDelete).toHaveBeenCalledWith('1')
  })
})
