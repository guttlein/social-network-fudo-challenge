import type { Comment as BaseComment } from "../types";

export type CommentNode = BaseComment & { replies: CommentNode[] };

export function buildCommentTree(comments: BaseComment[]): CommentNode[] {
  const map = new Map<string, CommentNode>();

  // Primero creamos un mapa de todos los comentarios con el campo replies vacío
  comments.forEach((comment) => {
    map.set(comment.id, { ...comment, replies: [] });
  });

  const roots: CommentNode[] = [];

  // Luego, organizamos en árbol
  map.forEach((comment) => {
    if (comment.parentId) {
      const parent = map.get(comment.parentId);
      if (parent) {
        parent.replies.push(comment);
      }
    } else {
      roots.push(comment);
    }
  });

  return roots;
}
