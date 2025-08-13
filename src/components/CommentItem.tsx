// components/CommentItem.tsx
import type { CommentNode } from "../utils/buildCommentTree";

interface CommentItemProps {
  comment: CommentNode;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export function CommentItem({ comment, onDelete, isDeleting }: CommentItemProps) {
  return (
    <div className="border-l pl-4 mt-2">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center mb-1">
            <img
              src={comment.avatar}
              alt={comment.name}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="font-semibold text-sm">{comment.name}</span>
          </div>
          <p className="text-sm">{comment.content}</p>
        </div>

        <button
          onClick={() => onDelete(comment.id)}
          disabled={isDeleting}
          className="text-red-600 hover:underline disabled:opacity-50 text-sm ml-4"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      {/* Render replies */}
      {comment.replies.length > 0 && (
        <div className="ml-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onDelete={onDelete}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      )}
    </div>
  );
}
