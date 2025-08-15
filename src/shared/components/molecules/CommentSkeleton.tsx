import { Skeleton } from '../atoms/Skeleton';

export function CommentSkeleton() {
  return (
    <div className="pl-3 sm:pl-4">
      <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
        <div className="flex items-start gap-3">
          <Skeleton
            width="w-8 h-8 sm:w-10 sm:h-10"
            height="h-8 sm:h-10"
            rounded="full"
          />
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3">
              <Skeleton width="w-24 sm:w-32" height="h-4 sm:h-5" />
              <Skeleton width="w-32 sm:w-40" height="h-3" />
            </div>
            {/* Content */}
            <div className="space-y-2 mb-2 sm:mb-3">
              <Skeleton width="w-full" height="h-4" />
              <Skeleton width="w-3/4" height="h-4" />
            </div>
            {/* Actions */}
            <div className="flex gap-3 pt-2 sm:pt-3 border-t border-gray-100">
              <Skeleton width="w-16 sm:w-20" height="h-4" />
              <Skeleton width="w-12 sm:w-16" height="h-4" />
              <Skeleton width="w-14 sm:w-18" height="h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
