import type { Comment, CommentNode } from "../types";

export function buildCommentTree(comments: Comment[]): CommentNode[] {
  const map: Record<string, CommentNode> = {};
  const roots: CommentNode[] = [];

  comments.forEach((comment) => {
    map[comment.id] = { ...comment, children: [] };
  });

  comments.forEach((comment) => {
    if (comment.parentId) {
      map[comment.parentId]?.children.push(map[comment.id]);
    } else {
      roots.push(map[comment.id]);
    }
  });

  return roots;
}
