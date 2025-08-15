interface InfiniteScrollLoaderProps {
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  loadingText?: string;
  fetchingText?: string;
}

export function InfiniteScrollLoader({
  isLoading = false,
  isFetchingNextPage = false,
  loadingText = 'Loading posts...',
  fetchingText = 'Loading more posts...',
}: InfiniteScrollLoaderProps) {
  if (!isLoading && !isFetchingNextPage) {
    return null;
  }
  const isInitialLoading = isLoading;
  const text = isInitialLoading ? loadingText : fetchingText;
  const spinnerSize = isInitialLoading ? 'h-8 w-8' : 'h-6 w-6';
  const padding = isInitialLoading ? 'py-8' : 'py-6';

  return (
    <div className={`flex justify-center ${padding}`}>
      <div className="text-center">
        <div
          className={`animate-spin rounded-full ${spinnerSize} border-b-2 border-blue-600 mx-auto mb-2`}
        ></div>
        <p className="text-gray-600 text-sm">{text}</p>
      </div>
    </div>
  );
}
