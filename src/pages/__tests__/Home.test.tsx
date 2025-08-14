import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from '../Home'

// Mock de la API
vi.mock('@/shared/api', () => ({
  getPosts: vi.fn(() => Promise.resolve([
    {
      id: '1',
      name: 'Test User',
      avatar: 'https://example.com/avatar.jpg',
      content: 'Test post content',
      createdAt: '2024-01-01T00:00:00.000Z'
    }
  ]))
}))

// Wrapper para providers
const createTestWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  )
}

describe('Home', () => {
  it('renders posts correctly', async () => {
    render(<Home />, { wrapper: createTestWrapper() })
    
    await waitFor(() => {
      expect(screen.getByText('Test post content')).toBeDefined()
      expect(screen.getByText('Test User')).toBeDefined()
    })
  })

  it('shows create post form', async () => {
    render(<Home />, { wrapper: createTestWrapper() })
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('New post...')).toBeDefined()
      expect(screen.getByText('Create Post')).toBeDefined()
    })
  })

  it('displays post actions', async () => {
    render(<Home />, { wrapper: createTestWrapper() })
    
    await waitFor(() => {
      expect(screen.getByText('See Details')).toBeDefined()
      expect(screen.getByText('Edit')).toBeDefined()
      expect(screen.getByText('Delete')).toBeDefined()
    })
  })
})
