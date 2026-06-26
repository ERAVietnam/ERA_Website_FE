"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";
import { Search, Loader2 } from "lucide-react";
import { magazinesApi } from "@/api/domains/magazines";
import { MagazineCard } from "./MagazineCard";
import type { EMagazine } from "@/types/api";

const PAGE_SIZE = 12;

export function MagazinePublicPage() {
  const [items, setItems] = useState<EMagazine[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchItems = useCallback(
    async (currentPage: number, query: string, append: boolean) => {
      setLoading(true);
      try {
        const res = await magazinesApi.getMagazines({
          page: currentPage,
          limit: PAGE_SIZE,
          search: query || undefined,
        });
        const newItems = res.items;
        setHasMore(newItems.length === PAGE_SIZE && currentPage < res.meta.totalPages);
        setItems((prev) => (append ? [...prev, ...newItems] : newItems));
      } catch {
        setHasMore(false);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    []
  );

  // Debounce search 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== searchInput.trim()) {
        setSearchQuery(searchInput.trim());
        setPage(1);
        setItems([]);
        fetchItems(1, searchInput.trim(), false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, searchQuery, fetchItems]);

  // Initial load
  useEffect(() => {
    queueMicrotask(() => fetchItems(1, "", false));
  }, [fetchItems]);

  // Load more
  useEffect(() => {
    if (page === 1) return;
    queueMicrotask(() => fetchItems(page, searchQuery, true));
  }, [page, searchQuery, fetchItems]);

  // Intersection observer for lazy load
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "200px" }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore, loading]);

  return (
    <main>
      {/* Hero / Header */}
      <Section padding="sm" bg="gray">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colors.primary.DEFAULT }} />
              <h1
                style={{
                  color: colors.primary.DEFAULT,
                  fontWeight: 700,
                  fontSize: "24px",
                }}
              >
                E-Magazine
              </h1>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Tìm kiếm e-magazine..."
                className="w-full rounded-lg border border-gray-200 bg-white pl-9 pr-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-400"
              />
            </div>
          </div>

          {initialLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={32} className="animate-spin text-gray-400" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              {searchQuery ? "Không tìm thấy e-magazine nào phù hợp." : "Chưa có e-magazine nào."}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {items.map((item) => (
                  <MagazineCard key={item.id} magazine={item} />
                ))}
              </div>

              {/* Lazy load sentinel */}
              <div ref={loaderRef} className="flex items-center justify-center py-8">
                {loading && <Loader2 size={28} className="animate-spin text-gray-400" />}
                {!hasMore && !loading && items.length > 0 && (
                  <p className="text-sm text-gray-400">Đã hiển thị tất cả e-magazine</p>
                )}
              </div>
            </>
          )}
        </div>
      </Section>
    </main>
  );
}
