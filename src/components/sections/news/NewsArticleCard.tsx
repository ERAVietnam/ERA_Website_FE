import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { colors } from "@/lib/theme";
import { ROUTES } from "@/lib/routes";
import { formatDate } from "@/lib/date";
import { getArticleImage, NEWS_PLACEHOLDER } from "@/lib/news";
import type { NewsArticle } from "@/types/api";

interface NewsArticleCardProps {
  article: NewsArticle;
  /** Tailwind height class for the image container, e.g. "h-56". */
  imageHeight?: string;
  /** Tailwind classes controlling title clamping and reserved height,
   *  e.g. "line-clamp-3 min-h-[4.125rem]". */
  titleLines?: string;
}

export function NewsArticleCard({
  article: item,
  imageHeight = "h-56",
  titleLines = "line-clamp-3 min-h-[4.125rem]",
}: NewsArticleCardProps) {
  return (
    <Link
      href={`${ROUTES.news}/${item.slug}`}
      className="group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
    >
      <div className={`relative ${imageHeight} bg-gray-100 overflow-hidden`}>
        <Image
          src={getArticleImage(item) || NEWS_PLACEHOLDER}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ objectPosition: "top right" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        <span
          className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-md text-white"
          style={{ backgroundColor: colors.primary.DEFAULT }}
        >
          {item.category.name}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h2 className={`font-bold leading-snug ${titleLines} group-hover:text-primary transition-colors`} style={{ color: colors.neutral.foreground, fontSize: "18px" }}>
          {item.title}
        </h2>
        <div className="flex items-center justify-between pt-4 mt-auto">
          <div className="text-xs space-y-0.5" style={{ color: colors.gray[400] }}>
            <p className="flex items-center gap-1">
              <Clock size={12} />
              {formatDate(item.displayPublishedAt || item.publishedAt || item.createdAt)} • {item.readTime || "1 phút đọc"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
