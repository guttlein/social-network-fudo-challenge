import { useState } from "react";
import type { CommentNode } from "../types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const levelColors = [
  "border-blue-400",
  "border-green-400",
  "border-yellow-400",
  "border-purple-400",
  "border-pink-400",
  "border-red-400",
];

interface CommentItemProps {
  comment: CommentNode;
  onDelete: (commentId: string) => void;
  onReply: (content: string, parentId: string) => void;
  isDeleting?: boolean;
  isCreating?: boolean;
  level?: number;
}

export function CommentItem({
  comment,
  onDelete,
  onReply,
  isDeleting,
  isCreating,
  level = 0,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    onReply(replyContent, comment.id);
    setReplyContent("");
    setIsReplying(false);
  };

  const borderColor = levelColors[level % levelColors.length];

  return (
    <div className={`border-l-2 ${borderColor} pl-4`}>
      <div className="flex items-start gap-3">
        <img
          src={comment.avatar}
          alt={comment.name}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold">{comment.name}</span>
              <span className="text-xs text-gray-500 ml-2">
                {formatDate(comment.createdAt)}
              </span>
            </div>
          </div>

          <p className="mt-1">{comment.content}</p>

          {/* Botones */}
          <div className="mt-2 flex gap-3 text-sm">
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="text-blue-600 hover:underline"
            >
              Reply
            </button>
            <button
              onClick={() => onDelete(comment.id)}
              disabled={isDeleting}
              className="text-red-600 hover:underline disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>

          {isReplying && (
            <form onSubmit={handleReplySubmit} className="mt-2">
              <textarea
                className="w-full border rounded p-2 mb-1"
                rows={2}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <button
                type="submit"
                disabled={isCreating}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isCreating ? "Posting..." : "Reply"}
              </button>
            </form>
          )}

          {comment.children &&
            comment.children.map((child) => (
              <CommentItem
                key={child.id}
                comment={child}
                onDelete={onDelete}
                onReply={onReply}
                isDeleting={isDeleting}
                isCreating={isCreating}
                level={level + 1}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
