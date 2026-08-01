"use client";

import { useState } from "react";
import { colors } from "@/lib/theme";
import type { AuthorPostItem } from "./mockAuthor";

interface AuthorPostsTabsProps {
  writtenPosts: AuthorPostItem[];
  reviewedPosts?: AuthorPostItem[];
  reviewNote?: string | null;
}

function PostCard({ post }: { post: AuthorPostItem }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="mb-1.5 text-xs text-gray-500">
        {post.category} · {post.date}
      </p>
      <a
        href={post.url}
        className="block font-semibold leading-snug transition-colors hover:text-primary"
        style={{ color: colors.primary.navy.DEFAULT }}
      >
        {post.title}
      </a>
    </div>
  );
}

export function AuthorPostsTabs({ writtenPosts, reviewedPosts, reviewNote }: AuthorPostsTabsProps) {
  const hasReviewed = !!reviewedPosts && reviewedPosts.length > 0;
  const [activeTab, setActiveTab] = useState<"written" | "reviewed">("written");

  const posts = activeTab === "written" ? writtenPosts : reviewedPosts ?? [];

  return (
    <div>
      {hasReviewed && (
        <div className="mb-5 flex gap-1 border-b-2 border-gray-200" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "written"}
            onClick={() => setActiveTab("written")}
            className={`-mb-0.5 border-b-[3px] px-4 py-2.5 text-[15px] font-semibold transition-colors ${
              activeTab === "written"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Bài đã viết ({writtenPosts.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "reviewed"}
            onClick={() => setActiveTab("reviewed")}
            className={`-mb-0.5 border-b-[3px] px-4 py-2.5 text-[15px] font-semibold transition-colors ${
              activeTab === "reviewed"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Bài đã kiểm duyệt ({reviewedPosts!.length})
          </button>
        </div>
      )}

      {activeTab === "reviewed" && reviewNote && (
        <div
          className="mb-4 rounded border-l-[3px] px-3.5 py-2.5 text-sm"
          style={{
            backgroundColor: "#FFF3E0",
            borderLeftColor: colors.tertiary.orange.DEFAULT,
          }}
        >
          {reviewNote}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {posts.map((post, index) => (
          <PostCard key={`${activeTab}-${index}`} post={post} />
        ))}
      </div>

      {/* Pager giả — chỉ UI */}
      <div className="mt-5 flex justify-center gap-2">
        <span
          className="rounded-md border px-3 py-1.5 text-sm text-white"
          style={{ backgroundColor: colors.primary.navy.DEFAULT, borderColor: colors.primary.navy.DEFAULT }}
        >
          1
        </span>
        <a href="#" className="rounded-md border border-gray-200 px-3 py-1.5 text-sm" style={{ color: colors.primary.navy.DEFAULT }}>
          2
        </a>
        <a href="#" className="rounded-md border border-gray-200 px-3 py-1.5 text-sm" style={{ color: colors.primary.navy.DEFAULT }}>
          ›
        </a>
      </div>
    </div>
  );
}
