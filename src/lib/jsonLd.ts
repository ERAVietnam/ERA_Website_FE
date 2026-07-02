import type { NewsArticle, Project, JobPosting } from "@/types/api";

const BASE_URL = "https://era.com.vn";
const LOGO_URL = `${BASE_URL}/logo.svg`;

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ERA Vietnam",
    url: BASE_URL,
    logo: LOGO_URL,
    sameAs: [
      "https://www.facebook.com/eravietnam",
    ],
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ERA Vietnam",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/tin-tuc/tim-kiem/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleJsonLd(article: NewsArticle): Record<string, unknown> {
  const imageUrl = article.featuredImage?.url;
  const publishedAt = article.publishedAt || article.displayPublishedAt || article.createdAt;
  const modifiedAt = article.updatedAt || publishedAt;

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary || article.metaDescription || undefined,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: publishedAt ? new Date(publishedAt).toISOString() : undefined,
    dateModified: modifiedAt ? new Date(modifiedAt).toISOString() : undefined,
    author: {
      "@type": "Organization",
      name: "ERA Vietnam",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "ERA Vietnam",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/tin-tuc/${article.slug}/`,
    },
  };
}

export function realEstateListingJsonLd(project: Project): Record<string, unknown> {
  const imageUrl = project.imageMedia?.url;

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: project.name,
    description: project.content
      ? project.content.replace(/<[^>]+>/g, "").slice(0, 5000)
      : undefined,
    image: imageUrl ? [imageUrl] : undefined,
    url: `${BASE_URL}/du-an/${project.slug}/`,
    address: project.location
      ? {
          "@type": "PostalAddress",
          addressLocality: project.location,
          addressCountry: "VN",
        }
      : undefined,
    datePosted: project.publishedAt
      ? new Date(project.publishedAt).toISOString()
      : undefined,
  };
}

function parseEmploymentType(type: string): string {
  const normalized = type.toLowerCase();
  if (normalized.includes("full-time") || normalized.includes("fulltime") || normalized === "full time") {
    return "FULL_TIME";
  }
  if (normalized.includes("part-time") || normalized.includes("parttime") || normalized === "part time") {
    return "PART_TIME";
  }
  if (normalized.includes("contract")) return "CONTRACTOR";
  if (normalized.includes("intern")) return "INTERN";
  if (normalized.includes("temporary")) return "TEMPORARY";
  return "FULL_TIME";
}

export function jobPostingJsonLd(job: JobPosting): Record<string, unknown> {
  const postedAt = job.publishedAt || job.createdAt;

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `${job.description}\n\nYêu cầu:\n${job.requirements}\n\nQuyền lợi:\n${job.benefits}`,
    datePosted: postedAt ? new Date(postedAt).toISOString() : undefined,
    validThrough: job.deadline ? new Date(job.deadline).toISOString() : undefined,
    employmentType: parseEmploymentType(job.type),
    hiringOrganization: {
      "@type": "Organization",
      name: "ERA Vietnam",
      sameAs: BASE_URL,
      logo: LOGO_URL,
    },
    jobLocation: job.location
      ? {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: job.location,
            addressCountry: "VN",
          },
        }
      : undefined,
    workMode: job.workMode || undefined,
    experienceRequirements: job.experience || undefined,
  };
}
