import { Skeleton } from '../atoms/Skeleton';

export function PostSkeleton() {
  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      {/* Header with avatar and name */}
      <div className="flex items-center mb-2">
        <Skeleton width="w-8" height="h-8" rounded="full" />
        <div className="ml-2 flex-1">
          <Skeleton width="w-24" height="h-4" className="mb-1" />
          <Skeleton width="w-32" height="h-3" />
        </div>
      </div>

      {/* Content */}
      <div className="mb-2 space-y-2">
        <Skeleton width="w-full" height="h-4" />
        <Skeleton width="w-3/4" height="h-4" />
        <Skeleton width="w-1/2" height="h-4" />
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-2">
        <Skeleton width="w-20" height="h-4" />
        <div className="flex gap-2">
          <Skeleton width="w-12" height="h-4" />
          <Skeleton width="w-16" height="h-4" />
        </div>
      </div>
    </div>
  );
}
