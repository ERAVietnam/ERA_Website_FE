"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { colors } from "@/lib/theme";
import { ProjectTags } from "./ProjectTags";

export function FeaturedProjectCard() {
  return (
    <Link
      href="/du-an-phu-gia-bao-loc"
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src="/project/pgbl_card_project.webp"
          alt="Phú Gia Bảo Lộc"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ objectPosition: "top right" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-[11px] font-bold uppercase tracking-wider" style={{ color: colors.primary.DEFAULT }}>
          DỰ ÁN
        </p>
        <h3
          className="mb-1 line-clamp-2 min-h-[3.5rem] text-xl font-extrabold"
          style={{ color: colors.primary.navy.DEFAULT }}
        >
          Phú Gia Bảo Lộc - Gated Community phong cách Mỹ
        </h3>
        <div className="mb-4 flex min-w-0 items-center gap-1 text-sm" style={{ color: colors.gray[500] }}>
          <MapPin size={14} className="shrink-0" />
          <span className="truncate">Thành Phố Bảo Lộc</span>
        </div>
        <ProjectTags tags={["Đang mở bán", "Lô biệt thự", "Lô liền kế"]} />
        <span
          className="mt-auto inline-flex items-center justify-end gap-1 self-end text-sm font-semibold transition-colors hover:underline"
          style={{ color: colors.primary.navy.DEFAULT }}
        >
          Xem Chi Tiết <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
