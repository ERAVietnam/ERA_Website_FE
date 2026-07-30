"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PaginatedResponse, PaginationMeta } from "@/types/api";

export interface UseAdminListOptions<F> {
  /** Filters khởi tạo (phải có page). */
  initialFilters: F;
  /** Limit mặc định dùng cho meta khởi tạo/reset. */
  defaultLimit?: number;
  /** false = tạm dừng fetch (vd: đang mở form). Mặc định true. */
  enabled?: boolean;
  /** Mặc định true: reset items/meta về rỗng khi fetch lỗi. Truyền false để giữ data cũ. */
  resetOnError?: boolean;
  /** Giá trị khởi tạo của loading. Mặc định true. */
  initialLoading?: boolean;
  /** Callback xử lý lỗi fetch (thường là handleApiError). */
  onError: (err: unknown) => void;
}

export function useAdminList<T, F extends { page?: number }>(
  fetchFn: (filters: F) => Promise<PaginatedResponse<T>>,
  options: UseAdminListOptions<F>,
) {
  const {
    initialFilters,
    defaultLimit = 10,
    enabled = true,
    resetOnError = true,
    initialLoading = true,
    onError,
  } = options;

  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(initialLoading);
  const [meta, setMeta] = useState<PaginationMeta>({
    page: 1,
    limit: defaultLimit,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<F>(initialFilters);

  const fetchFnRef = useRef(fetchFn);
  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  const onErrorRef = useRef(onError);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchFnRef.current(filters);
      setItems(response.items);
      setMeta(response.meta);
    } catch (err) {
      if (resetOnError) {
        setItems([]);
        setMeta({ page: 1, limit: defaultLimit, total: 0, totalPages: 0 });
      }
      onErrorRef.current(err);
    } finally {
      setLoading(false);
    }
  }, [filters, resetOnError, defaultLimit]);

  useEffect(() => {
    if (!enabled) return;
    queueMicrotask(fetchItems);
  }, [enabled, fetchItems]);

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const handleFilterChange = useCallback(
    <K extends keyof F>(key: K, value: F[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
    },
    [],
  );

  return {
    items,
    setItems,
    loading,
    meta,
    setMeta,
    filters,
    setFilters,
    fetchItems,
    handlePageChange,
    handleFilterChange,
  };
}
