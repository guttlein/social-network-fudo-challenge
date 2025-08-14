import axios from "axios";
import type { Post, Comment } from "../types";

const API_URL = "https://665de6d7e88051d60408c32d.mockapi.io";

// ------- POSTS -------

/**
 * Fetch all posts.
 */
export const getPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get<Post[]>(`${API_URL}/post`);
  return data;
};

/**
 * Fetch a single post by ID.
 * Returns null if post is not found (404).
 */
export const getSinglePost = async (postId: string): Promise<Post | null> => {
  try {
    const { data } = await axios.get<Post>(`${API_URL}/post/${postId}`);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // Return null if post not found instead of throwing
      return null;
    }
    throw error;
  }
};

/**
 * Create a new post.
 */
export const createPost = async (post: Partial<Post>): Promise<Post> => {
  const { data } = await axios.post<Post>(`${API_URL}/post`, post);
  return data;
};

/**
 * Delete a post by ID.
 * Throws if post not found or error occurs.
 */
export const deletePost = async (postId: string): Promise<Post> => {
  const { data } = await axios.delete<Post>(`${API_URL}/post/${postId}`);
  return data;
};

/**
 * Update a post by ID.
 */
export const updatePost = async (postId: string, post: Partial<Post>): Promise<Post> => {
  const { data } = await axios.put<Post>(`${API_URL}/post/${postId}`, post);
  return data;
};

// ------- COMMENTS -------

/**
 * Fetch comments for a post.
 * Returns empty array if no comments found (404).
 */
export const getComments = async (postId: string): Promise<Comment[]> => {
  try {
    const { data } = await axios.get<Comment[]>(`${API_URL}/post/${postId}/comment`);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // Treat 404 as no comments
      return [];
    }
    throw error;
  }
};

/**
 * Create a comment for a post.
 */
export const createComment = async (
  postId: string,
  comment: Partial<Comment>
): Promise<Comment> => {
  const { data } = await axios.post<Comment>(`${API_URL}/post/${postId}/comment`, comment);
  return data;
};

/**
 * Delete a comment by ID.
 */
export const deleteComment = async (
  postId: string,
  commentId: string
): Promise<Comment> => {
  const { data } = await axios.delete<Comment>(
    `${API_URL}/post/${postId}/comment/${commentId}`
  );
  return data;
};

/**
 * Update a comment by ID.
 */
export const updateComment = async (
  postId: string,
  commentId: string,
  comment: Partial<Comment>
): Promise<Comment> => {
  const { data } = await axios.put<Comment>(
    `${API_URL}/post/${postId}/comment/${commentId}`,
    comment
  );
  return data;
};
