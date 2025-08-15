import { Skeleton } from '../atoms/Skeleton';

export function PostSkeleton() {
  return (
    <div className="border border-gray-200 p-4 sm:p-6 rounded-lg shadow-sm bg-white">
      {/* Header with avatar and name */}
      <div className="flex items-center mb-3 sm:mb-4">
        <Skeleton
          width="w-10 h-10 sm:w-12 sm:h-12"
          height="h-10 sm:h-12"
          rounded="full"
        />
        <div className="ml-3 sm:ml-4 flex-1">
          <Skeleton width="w-24 sm:w-32" height="h-4 sm:h-5" className="mb-2" />
          <Skeleton width="w-32 sm:w-40" height="h-3" />
        </div>
      </div>
      {/* Content */}
      <div className="mb-3 sm:mb-4 space-y-2 sm:space-y-3">
        <Skeleton width="w-full" height="h-4" />
        <Skeleton width="w-3/4" height="h-4" />
        <Skeleton width="w-1/2" height="h-4" />
      </div>
      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 sm:pt-4 border-t border-gray-100">
        <Skeleton width="w-20 sm:w-24" height="h-4" />
        <div className="flex gap-3">
          <Skeleton width="w-12 sm:w-16" height="h-4" />
          <Skeleton width="w-16 sm:w-20" height="h-4" />
        </div>
      </div>
    </div>
  );
}
