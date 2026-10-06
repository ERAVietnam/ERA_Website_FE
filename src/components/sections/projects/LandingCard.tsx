"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { colors } from "@/lib/theme";
import { ProjectTags } from "./ProjectTags";
import type { Landing } from "@/types/api";

/* Card landing hiển thị đầu trang /du-an — bấm vào dẫn đến landing page (url do admin cấu hình) */
export function LandingCard({ landing }: { landing: Landing }) {
  const imageUrl = landing.imageMedia?.url || null;

  return (
    <Link
      href={landing.url}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={landing.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            Chưa có ảnh bìa
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p
          className="mb-1 text-[11px] font-bold uppercase tracking-wider"
          style={{ color: colors.primary.DEFAULT }}
        >
          Landing
        </p>
        <h3
          className="mb-1 line-clamp-2 min-h-[3.5rem] text-xl font-extrabold"
          style={{ color: colors.primary.navy.DEFAULT }}
        >
          {landing.title}
        </h3>
        <div
          className="mb-4 flex min-w-0 items-center gap-1 text-sm"
          style={{ color: colors.gray[500] }}
        >
          <MapPin size={14} className="shrink-0" />
          <span className="truncate">{landing.location}</span>
        </div>
        {landing.tags.length > 0 && <ProjectTags tags={landing.tags} />}
        <span
          className="mt-auto inline-flex items-center justify-end gap-1 self-end pt-2 text-sm font-semibold transition-colors hover:underline"
          style={{ color: colors.primary.navy.DEFAULT }}
        >
          Xem Chi Tiết <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
