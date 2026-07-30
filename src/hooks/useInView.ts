"use client";

import { useEffect, useState, type RefObject } from "react";

export interface UseInViewOptions extends IntersectionObserverInit {
  /**
   * Nếu true: chỉ bật inView=true đúng 1 lần khi element vào viewport
   * (unobserve ngay sau đó), không bao giờ reset về false.
   * Mặc định false: inView phản ánh trạng thái intersect hiện tại (toggle 2 chiều).
   */
  once?: boolean;
}

/**
 * Observe MỘT element (qua ref) bằng IntersectionObserver và trả về
 * trạng thái boolean `inView`.
 *
 * - `once: false` (mặc định): set inView = entry.isIntersecting ở mọi callback.
 * - `once: true`: set inView = true khi intersect lần đầu rồi unobserve.
 *
 * Effect chỉ chạy lại khi options thay đổi; với options hằng số thì chạy
 * đúng 1 lần sau mount (ref đã được gán), tương đương deps [].
 */
export function useInView<T extends Element>(
  targetRef: RefObject<T | null>,
  options: UseInViewOptions = {}
): boolean {
  const { once = false, threshold, rootMargin, root } = options;
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin, root }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetRef, once, threshold, rootMargin, root]);

  return inView;
}
