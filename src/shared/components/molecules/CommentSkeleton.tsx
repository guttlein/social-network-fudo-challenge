import { Skeleton } from '../atoms/Skeleton';

interface CommentSkeletonProps {
  level?: number;
}

export function CommentSkeleton({ level = 0 }: CommentSkeletonProps) {
  const levelColors = [
    'border-blue-400',
    'border-green-400',
    'border-yellow-400',
    'border-purple-400',
    'border-pink-400',
    'border-red-400',
  ];

  const borderColor = levelColors[level % levelColors.length];

  return (
    <div className={`border-l-2 ${borderColor} pl-4`}>
      <div className="flex items-start gap-3">
        <Skeleton width="w-8" height="h-8" rounded="full" />
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <Skeleton width="w-24" height="h-4" />
            <Skeleton width="w-32" height="h-3" />
          </div>

          {/* Content */}
          <div className="space-y-2 mb-2">
            <Skeleton width="w-full" height="h-4" />
            <Skeleton width="w-3/4" height="h-4" />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Skeleton width="w-16" height="h-4" />
            <Skeleton width="w-12" height="h-4" />
            <Skeleton width="w-14" height="h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
