"use client";

import { useState, useEffect, useRef, RefObject } from "react";

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

/**
 * Custom hook to detect when an element is visible in the viewport
 * @param options - IntersectionObserver options with additional triggerOnce parameter
 * @returns [ref, isIntersecting] - Ref to attach to the element and boolean indicating if element is visible
 */
export function useIntersectionObserver<T extends Element = HTMLDivElement>({
  root = null,
  rootMargin = "0px",
  threshold = 0,
  triggerOnce = false,
}: IntersectionObserverOptions = {}): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const node = ref.current;

    // If ref not attached or no IntersectionObserver support, exit early
    if (!node || typeof IntersectionObserver === "undefined") return;

    let observer: IntersectionObserver;

    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];

      // Update state
      setIsIntersecting(entry.isIntersecting);

      // Disconnect observer if triggerOnce and element is intersecting
      if (triggerOnce && entry.isIntersecting && observer) {
        observer.disconnect();
      }
    };

    // Create an observer with the given options
    observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });

    // Start observing
    observer.observe(node);

    // Clean up
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [root, rootMargin, threshold, triggerOnce]);

  return [ref, isIntersecting];
}
