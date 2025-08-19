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

export const deletePost = async (
  postId: string,
  onProgress?: (progress: {
    total: number;
    deleted: number;
    current: string;
  }) => void
): Promise<Post> => {
  // Get ALL comments for this post, including orphaned ones
  const comments = await getComments(postId);

  // Delete all comments associated with this post (including orphaned ones)
  if (comments.length > 0) {
    // Report initial progress
    onProgress?.({
      total: comments.length,
      deleted: 0,
      current: `Starting deletion of ${comments.length} comments...`,
    });

    // Delete all comments in parallel, regardless of their parentId status
    const deleteCommentPromises = comments.map(async (comment, index) => {
      await deleteComment(postId, comment.id);

      // Report progress after each comment is deleted
      onProgress?.({
        total: comments.length,
        deleted: index + 1,
        current: `Deleted comment: ${comment.content.substring(0, 30)}${comment.content.length > 30 ? '...' : ''}`,
      });
    });

    await Promise.all(deleteCommentPromises);

    // Force delete any remaining comments that MockAPI didn't remove
    // This is necessary because MockAPI reuses IDs after deletion
    let remainingComments = await getComments(postId);

    if (remainingComments.length > 0) {
      onProgress?.({
        total: comments.length + remainingComments.length,
        deleted: comments.length,
        current: `Found ${remainingComments.length} remaining comments, forcing deletion...`,
      });

      // Try to delete comments multiple times with increasing delays
      for (let attempt = 1; attempt <= 5; attempt++) {
        const deletePromises = remainingComments.map(async (comment, index) => {
          await deleteComment(postId, comment.id);

          // Report progress during forced deletion
          onProgress?.({
            total: comments.length + remainingComments.length,
            deleted: comments.length + index + 1,
            current: `Force deleting comment (attempt ${attempt}): ${comment.content.substring(0, 30)}${comment.content.length > 30 ? '...' : ''}`,
          });
        });

        await Promise.all(deletePromises);

        // Wait with increasing delay to give MockAPI time to process
        const delayMs = attempt * 500; // 500ms, 1000ms, 1500ms, 2000ms, 2500ms
        await new Promise(resolve => setTimeout(resolve, delayMs));

        remainingComments = await getComments(postId);

        if (remainingComments.length === 0) {
          onProgress?.({
            total: comments.length + remainingComments.length,
            deleted: comments.length + remainingComments.length,
            current: 'All comments successfully deleted!',
          });
          break;
        }
      }
    }
  }

  // Report post deletion
  onProgress?.({
    total: comments.length,
    deleted: comments.length,
    current: 'Deleting post...',
  });

  // Finally, delete the post
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
