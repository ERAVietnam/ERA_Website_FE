"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import { ROUTES } from "@/lib/routes";
import { recruitmentApi } from "@/api/domains/recruitment";
import type { JobPosting } from "@/types/api";

const INITIAL_DISPLAY_COUNT = 4;

export function ApplyRecruitmentSection() {
  const [allJobs, setAllJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  // Keep the loading indicator active during the initial fetch; it is toggled
  // asynchronously inside the promise callbacks so it does not trigger a
  // synchronous setState in the effect body.
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    recruitmentApi
      .getPublishedJobs({ limit: 100 })
      .then((data) => setAllJobs(data))
      .catch(() => setAllJobs([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredJobs = allJobs;

  const displayedJobs = useMemo(
    () => (showAll ? filteredJobs : filteredJobs.slice(0, INITIAL_DISPLAY_COUNT)),
    [filteredJobs, showAll]
  );

  const hasAnyJob = allJobs.length > 0;
  const hasFilteredJob = filteredJobs.length > 0;
  const canShowMore = filteredJobs.length > INITIAL_DISPLAY_COUNT;

  return (
    <Section padding="md" bg="white">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8">
        <h2
          style={{
            color: colors.primary.DEFAULT,
            fontWeight: 900,
            fontSize: "clamp(28px, 4vw, 40px)",
            lineHeight: 1.1,
          }}
        >
          VỊ TRÍ ĐANG TUYỂN DỤNG
        </h2>

      </div>

      {/* Job List */}
      <div className="flex flex-col gap-4 mb-8">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Đang tải danh sách vị trí...</div>
        ) : !hasAnyJob ? (
          <div className="text-center py-12 text-gray-400">
            Hiện không tuyển dụng nhân sự
          </div>
        ) : (
          displayedJobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between gap-4 rounded-2xl bg-white px-6 py-5 shadow-sm transition-all duration-300"
            >
              <div className="min-w-0">
                <h3
                  className="text-base md:text-lg font-semibold mb-1"
                  style={{ color: colors.primary.navy.DEFAULT }}
                >
                  {job.title}
                </h3>
                <div
                  className="flex flex-wrap items-center gap-3 text-xs md:text-sm"
                  style={{ color: colors.gray[500] }}
                >
                  <span>{job.type}</span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="inline-block w-1 h-1 rounded-full"
                      style={{ backgroundColor: colors.gray[400] }}
                    />
                    {job.location}
                  </span>
                  {job.workMode && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="inline-block w-1 h-1 rounded-full"
                        style={{ backgroundColor: colors.gray[400] }}
                      />
                      {job.workMode}
                    </span>
                  )}
                </div>
              </div>

              <Button asChild className="flex-shrink-0 rounded-full px-6">
                <Link href={`${ROUTES.applyDetail}/${encodeURIComponent(job.slug)}`}>
                  Xem chi tiết
                </Link>
              </Button>
            </div>
          ))
        )}
      </div>

      {/* View All */}
      {hasFilteredJob && canShowMore && (
        <div className="flex justify-center">
          <Button
            variant="navy-outline"
            className="rounded-[15px] px-8"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Thu gọn" : `Xem tất cả ${filteredJobs.length} vị trí`}
          </Button>
        </div>
      )}
    </Section>
  );
}
