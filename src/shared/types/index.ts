// Core types

export interface Post {
  id: string;
  title: string;
  name: string;
  avatar: string;
  content: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  name: string;
  avatar: string;
  content: string;
  createdAt: string;
  parentId: string | null;
}

// Comment with nested children for tree structure
export interface CommentNode extends Comment {
  children: CommentNode[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  email?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
