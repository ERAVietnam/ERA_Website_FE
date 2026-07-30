"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Quản lý ô tìm kiếm có debounce. Callback nhận raw value của input
 * (việc trim/convert do callback quyết định) sau `delay` ms.
 */
export function useDebouncedSearch(callback: (value: string) => void, delay = 500) {
  const [searchInput, setSearchInput] = useState("");
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const timer = setTimeout(() => {
      callbackRef.current(searchInput);
    }, delay);
    return () => clearTimeout(timer);
  }, [searchInput, delay]);

  return { searchInput, setSearchInput };
}
