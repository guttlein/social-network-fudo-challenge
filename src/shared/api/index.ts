import axios from 'axios';
import type { Post, Comment } from '../types';
import { API_CONFIG, MOCK_USER } from '../constants';

// Posts API functions

export const getPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get<Post[]>(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}`
  );
  return data;
};

export const getSinglePost = async (postId: string): Promise<Post | null> => {
  try {
    const { data } = await axios.get<Post>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}/${postId}`
    );
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const createPost = async (post: Partial<Post>): Promise<Post> => {
  // Send complete post data with mock user
  const postData = {
    ...post,
    title: post.title || 'Untitled Post', // Default title if not provided
    name: MOCK_USER.name,
    avatar: MOCK_USER.avatar,
    createdAt: new Date().toISOString(),
  };

  const { data } = await axios.post<Post>(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}`,
    postData
  );
  return data;
};

export const deletePost = async (postId: string): Promise<Post> => {
  const { data } = await axios.delete<Post>(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}/${postId}`
  );
  return data;
};

export const updatePost = async (
  postId: string,
  post: Partial<Post>
): Promise<Post> => {
  const { data } = await axios.put<Post>(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}/${postId}`,
    post
  );
  return data;
};

// Comments API functions

export const getComments = async (postId: string): Promise<Comment[]> => {
  try {
    const { data } = await axios.get<Comment[]>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}/${postId}${API_CONFIG.ENDPOINTS.COMMENTS}`
    );
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

export const createComment = async (
  postId: string,
  comment: Partial<Comment>
): Promise<Comment> => {
  // Send complete comment data with mock user
  const commentData = {
    ...comment,
    name: MOCK_USER.name,
    avatar: MOCK_USER.avatar,
    createdAt: new Date().toISOString(),
    parentId: comment.parentId,
  };

  const { data } = await axios.post<Comment>(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}/${postId}${API_CONFIG.ENDPOINTS.COMMENTS}`,
    commentData
  );
  return data;
};

export const deleteComment = async (
  postId: string,
  commentId: string
): Promise<Comment> => {
  const { data } = await axios.delete<Comment>(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}/${postId}${API_CONFIG.ENDPOINTS.COMMENTS}/${commentId}`
  );
  return data;
};

export const updateComment = async (
  postId: string,
  commentId: string,
  comment: Partial<Comment>
): Promise<Comment> => {
  const { data } = await axios.put<Comment>(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}/${postId}${API_CONFIG.ENDPOINTS.COMMENTS}/${commentId}`,
    comment
  );
  return data;
};
