import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '../api';

interface UseInfinitePostsOptions {
  pageSize?: number;
}

export function useInfinitePosts({
  pageSize = 10,
}: UseInfinitePostsOptions = {}) {
  return useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: async ({ pageParam = 1 }) => {
      // Simulate pagination
      const allPosts = await getPosts();
      const startIndex = (pageParam - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const posts = allPosts.slice(startIndex, endIndex);

      return {
        posts,
        nextPage: endIndex < allPosts.length ? pageParam + 1 : undefined,
        hasMore: endIndex < allPosts.length,
        totalPosts: allPosts.length,
      };
    },
    getNextPageParam: lastPage => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
