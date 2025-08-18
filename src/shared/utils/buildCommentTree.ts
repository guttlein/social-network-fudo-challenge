import type { Comment, CommentNode } from '../types';

// Builds tree structure from flat array of comments
export function buildCommentTree(comments: Comment[]): CommentNode[] {
  const map: Record<string, CommentNode> = {};
  const roots: CommentNode[] = [];

  // Create CommentNode objects with empty children arrays
  comments.forEach(comment => {
    map[comment.id] = { ...comment, children: [] };
  });

  // Build the tree structure
  comments.forEach(comment => {
    if (comment.parentId && map[comment.parentId]) {
      // Add child comment to parent's children array if parent exists
      map[comment.parentId].children.push(map[comment.id]);
    } else {
      // Add to roots if no parentId OR if parent doesn't exist (orphaned comment)
      roots.push(map[comment.id]);
    }
  });

  return roots;
}
