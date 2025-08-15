import { useEffect, useRef, useCallback } from 'react';

interface UseThresholdFetchOptions {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export function useThresholdFetch(
  onIntersect: () => void,
  options: UseThresholdFetchOptions = {}
) {
  const { threshold = 0.1, rootMargin = '100px', enabled = true } = options;
  const targetRef = useRef<HTMLDivElement>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && enabled) {
          onIntersect();
        }
      });
    },
    [onIntersect, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(callback, {
      threshold,
      rootMargin,
    });

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [callback, threshold, rootMargin, enabled]);

  return targetRef;
}
