// types.ts
export interface Post {
  id: string;
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

// Comentario con hijos
export interface CommentNode extends Comment {
  children: CommentNode[];
}
