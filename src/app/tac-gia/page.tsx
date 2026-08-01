import type { Metadata } from "next";
import { AuthorProfilePage } from "@/components/sections/author/AuthorProfilePage";
import { mockAuthor } from "@/components/sections/author/mockAuthor";
import { breadcrumbJsonLd } from "@/lib/jsonLd";

const BASE_URL = "https://era.com.vn";

// Trang tạm dùng mock data — khi triển khai chức năng thật sẽ chuyển sang /tac-gia/[slug]
export async function generateMetadata(): Promise<Metadata> {
  const title = `${mockAuthor.fullName}${mockAuthor.jobTitle ? ` — ${mockAuthor.jobTitle} tại ERA Vietnam` : ""} | Hồ sơ chuyên gia BĐS`;
  const description = `${mockAuthor.fullName}${mockAuthor.jobTitle ? `, ${mockAuthor.jobTitle}` : ""} — ${mockAuthor.bio.slice(0, 140)}...`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
    },
  };
}

function authorProfileJsonLd() {
  const authorUrl = `${BASE_URL}/tac-gia/`;
  const sameAs = [mockAuthor.linkedinUrl, mockAuthor.facebookUrl, mockAuthor.youtubeUrl].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        url: authorUrl,
        name: `${mockAuthor.fullName}${mockAuthor.jobTitle ? ` — ${mockAuthor.jobTitle}` : ""} | ERA Vietnam`,
        dateModified: mockAuthor.updatedAt,
        mainEntity: { "@id": `${authorUrl}#person` },
      },
      {
        "@type": "Person",
        "@id": `${authorUrl}#person`,
        name: mockAuthor.fullName,
        url: authorUrl,
        ...(mockAuthor.avatarUrl ? { image: mockAuthor.avatarUrl } : {}),
        ...(mockAuthor.jobTitle ? { jobTitle: mockAuthor.jobTitle } : {}),
        description: mockAuthor.bio,
        email: mockAuthor.workEmail,
        telephone: mockAuthor.zaloPhone,
        knowsAbout: mockAuthor.expertise,
        areaServed: mockAuthor.areasServed.map((name) => ({ "@type": "Place", name })),
        worksFor: {
          "@type": "RealEstateAgent",
          name: "ERA Vietnam",
          url: BASE_URL,
        },
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
    ],
  };
}

export default function AuthorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorProfileJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Trang chủ", url: BASE_URL },
              { name: "Tác giả", url: `${BASE_URL}/tac-gia/` },
              { name: mockAuthor.fullName, url: `${BASE_URL}/tac-gia/` },
            ])
          ),
        }}
      />
      <AuthorProfilePage author={mockAuthor} />
    </>
  );
}
