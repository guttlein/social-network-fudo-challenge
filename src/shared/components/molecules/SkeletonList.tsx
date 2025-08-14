import { PostSkeleton } from './PostSkeleton';
import { CommentSkeleton } from './CommentSkeleton';

interface SkeletonListProps {
  type: 'post' | 'comment';
  count?: number;
  commentLevel?: number;
}

export function SkeletonList({
  type,
  count = 3,
  commentLevel = 0,
}: SkeletonListProps) {
  const skeletons = Array.from({ length: count }, (_, index) => {
    if (type === 'post') {
      return <PostSkeleton key={index} />;
    }
    return <CommentSkeleton key={index} level={commentLevel} />;
  });

  return <div className="space-y-4">{skeletons}</div>;
}
