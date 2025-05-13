"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

/**
 * Custom hook for infinite scroll functionality
 * @param {Function} loadMore - Function to load more items
 * @param {boolean} hasMore - Whether there are more items to load
 * @param {boolean} loading - Whether items are currently being loaded
 * @returns {Object} - IntersectionObserver ref to attach to the loader element
 */
export const useInfiniteScroll = (loadMore, hasMore, loading) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView, hasMore, loading, loadMore]);

  return { ref };
};
