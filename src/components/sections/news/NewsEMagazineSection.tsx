"use client";

import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";
import { magazinesApi } from "@/api/domains/magazines";
import { MagazineCard } from "@/components/sections/magazines/MagazineCard";
import type { EMagazine } from "@/types/api";

interface NewsEMagazineSectionProps {
  bg?: "white" | "gray";
}

export const NewsEMagazineSection = memo(function NewsEMagazineSection({
  bg = "gray",
}: NewsEMagazineSectionProps) {
  const [magazines, setMagazines] = useState<EMagazine[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    magazinesApi
      .getMagazines({ limit: 4, page: 1 })
      .then((res) => {
        if (!cancelled) {
          setMagazines(res.items.slice(0, 4));
          setTotal(res.meta.total);
        }
      })
      .catch(() => {
        if (!cancelled) setMagazines([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Section padding="sm" bg={bg}>
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-6 rounded-full" style={{ backgroundColor: colors.primary.DEFAULT }} />
        <h2
          style={{
            color: colors.primary.DEFAULT,
            fontWeight: 700,
            fontSize: "24px",
          }}
        >
          E-Magazine
        </h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-sm flex gap-4 h-44 animate-pulse"
            >
              <div className="w-56 sm:w-72 aspect-[16/9] rounded-lg bg-gray-200" />
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
                <div className="h-20 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : magazines.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Chưa có e-magazine nào.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {magazines.map((mag) => (
              <MagazineCard key={mag.id} magazine={mag} />
            ))}
          </div>
          {total > 4 && (
            <div className="mt-6 text-right">
              <Link
                href="/tin-tuc/tap-chi"
                className="inline-flex items-center text-sm font-semibold hover:opacity-80 transition-opacity"
                style={{ color: colors.primary.DEFAULT }}
              >
                Xem thêm →
              </Link>
            </div>
          )}
        </>
      )}
    </Section>
  );
});
