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
    const node = map[comment.id];
    const hasParentId = Boolean(comment.parentId);
    const parentExists =
      hasParentId && Boolean(map[comment.parentId as string]);

    if (hasParentId && parentExists) {
      // Add child comment to parent's children array if parent exists
      map[comment.parentId as string].children.push(node);
    } else {
      // Add to roots if no parentId OR if parent doesn't exist (orphaned comment)
      if (hasParentId && !parentExists) {
        node.isOrphaned = true;
      }
      roots.push(node);
    }
  });

  return roots;
}
