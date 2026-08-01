import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle, User } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";
import { AuthorPostsTabs } from "./AuthorPostsTabs";
import type { DisplayAuthor } from "./mockAuthor";

interface AuthorProfilePageProps {
  author: DisplayAuthor;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mb-5 border-l-4 pl-3 text-xl font-bold leading-snug"
      style={{ color: colors.primary.navy.DEFAULT, borderLeftColor: colors.primary.DEFAULT }}
    >
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="mb-2.5 text-[15px] font-semibold uppercase tracking-wide"
      style={{ color: colors.primary.navy.DEFAULT }}
    >
      {children}
    </h3>
  );
}

function TimelineItem({ year, name, role }: { year: string; name: string; role: string }) {
  return (
    <li className="relative border-l-2 border-gray-200 pb-4 pl-5 last:border-l-transparent last:pb-0">
      <span
        className="absolute -left-[6px] top-1.5 h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: colors.primary.DEFAULT }}
      />
      <span className="text-xs font-semibold tracking-wide text-gray-500">{year}</span>
      <span className="block font-semibold">{name}</span>
      <span className="text-sm text-gray-500">{role}</span>
    </li>
  );
}

export function AuthorProfilePage({ author }: AuthorProfilePageProps) {
  const currentYear = new Date().getFullYear();
  const yearsExperience = author.startYear ? currentYear - author.startYear : null;
  const hasAwards = !!author.awards && author.awards.length > 0;
  const hasPress = !!author.pressMentions && author.pressMentions.length > 0;
  const socials = [
    { url: author.linkedinUrl, label: "LinkedIn", color: "#0A66C2" },
    { url: author.facebookUrl, label: "Facebook", color: "#1877F2" },
    { url: author.youtubeUrl, label: "YouTube", color: "#FF0000" },
  ].filter((s) => !!s.url);

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: colors.gray[50] }}>
        <Container size="lg" className="pt-6">
          <nav className="text-[13px] text-gray-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:underline">Trang chủ</Link>
            <span className="mx-1.5">›</span>
            <Link href="/tac-gia" className="hover:underline">Tác giả</Link>
            <span className="mx-1.5">›</span>
            <span aria-current="page" className="font-medium text-gray-800">{author.fullName}</span>
          </nav>
        </Container>
      </div>

      {/* 1. Hero */}
      <Section padding="xs" bg="gray">
        <Container size="lg" className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {author.avatarUrl ? (
            <Image
              src={author.avatarUrl}
              alt={author.avatarAlt || author.fullName}
              width={160}
              height={160}
              className="h-30 w-30 shrink-0 rounded-lg border border-gray-200 object-cover sm:h-40 sm:w-40"
            />
          ) : (
            <div className="flex h-30 w-30 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 sm:h-40 sm:w-40">
              <User size={56} className="text-gray-400" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h1
              className="mb-1.5 text-[26px] font-bold leading-tight sm:text-[34px]"
              style={{ color: colors.primary.navy.DEFAULT }}
            >
              {author.fullName}
            </h1>
            {(author.jobTitle || author.division) && (
              <p className="mb-4 text-[17px] text-gray-500">
                {author.jobTitle && <b className="font-semibold text-gray-800">{author.jobTitle}</b>}
                {author.jobTitle && author.division && " — "}
                {author.division && <span>{author.division}, ERA Vietnam</span>}
              </p>
            )}

            {(yearsExperience || author.licenseNumber || author.associationMember) && (
              <div className="mb-5 flex flex-wrap gap-2.5">
                {yearsExperience && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-[13.5px] font-medium">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: colors.tertiary.orange.DEFAULT }} />
                    {yearsExperience} năm kinh nghiệm
                  </span>
                )}
                {author.licenseNumber && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-[13.5px] font-medium">
                    <span className="h-2 w-2 rounded-full bg-[#1B7F3B]" />
                    CCHN môi giới BĐS số {author.licenseNumber}
                    {author.licenseYear ? ` — cấp ${author.licenseYear}` : ""}
                  </span>
                )}
                {author.associationMember && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-[13.5px] font-medium">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: colors.tertiary.orange.DEFAULT }} />
                    {author.associationMember}
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-2.5">
              <a
                href={`mailto:${author.workEmail}`}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                <Mail size={16} /> Gửi email
              </a>
              <a
                href={`https://zalo.me/${author.zaloPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-gray-50"
                style={{ color: colors.primary.navy.DEFAULT, borderColor: colors.primary.navy.DEFAULT }}
              >
                <MessageCircle size={16} /> Chat Zalo
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Chuyên môn + Khu vực */}
      <Section padding="xs" className="border-t border-gray-100">
        <Container size="lg" className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <SubHeading>Lĩnh vực chuyên môn</SubHeading>
            <div className="flex flex-wrap gap-2">
              {author.expertise.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[13.5px]"
                  style={{ color: colors.primary.navy.DEFAULT }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <SubHeading>Khu vực phụ trách</SubHeading>
            <ul className="list-disc space-y-1 pl-5">
              {author.areasServed.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 3. Giới thiệu */}
      <Section padding="xs" bg="gray" className="border-t border-gray-100">
        <Container size="lg">
          <SectionHeading>Giới thiệu</SectionHeading>
          <p className="max-w-[68ch] text-[17px] leading-relaxed">{author.bio}</p>
        </Container>
      </Section>

      {/* 4. Kinh nghiệm + Giải thưởng */}
      <Section padding="xs" className="border-t border-gray-100">
        <Container size="lg" className={`grid grid-cols-1 gap-8 ${hasAwards ? "md:grid-cols-2" : ""}`}>
          <div>
            <SubHeading>Dự án đã triển khai</SubHeading>
            <ul>
              {author.experiences.map((exp, index) => (
                <TimelineItem key={index} year={exp.yearRange} name={exp.name} role={exp.role} />
              ))}
            </ul>
          </div>
          {hasAwards && (
            <div>
              <SubHeading>Giải thưởng</SubHeading>
              <ul>
                {author.awards!.map((award, index) => (
                  <TimelineItem key={index} year={award.year} name={award.name} role={award.org} />
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>

      {/* 5. Báo chí — ẩn cả section nếu rỗng */}
      {hasPress && (
        <Section padding="xs" bg="gray" className="border-t border-gray-100">
          <Container size="lg">
            <SectionHeading>Xuất hiện trên báo chí</SectionHeading>
            <ul>
              {author.pressMentions!.map((press, index) => (
                <li key={index} className="border-b border-gray-100 py-3 last:border-b-0">
                  <a
                    href={press.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary hover:underline"
                    style={{ color: colors.secondary.DEFAULT }}
                  >
                    {press.title}
                  </a>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {press.source} · {press.date}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* 6. Nội dung — tabs bài viết */}
      <Section padding="xs" className="border-t border-gray-100">
        <Container size="lg">
          <SectionHeading>Nội dung</SectionHeading>
          <AuthorPostsTabs
            writtenPosts={author.writtenPosts}
            reviewedPosts={author.reviewedPosts}
            reviewNote={author.reviewNote}
          />
        </Container>
      </Section>

      {/* 7. Liên kết xác thực + cập nhật */}
      <Section padding="xs" bg="gray" className="border-t border-gray-100">
        <Container size="lg">
          <SectionHeading>Liên kết xác thực</SectionHeading>
          <div className="flex flex-wrap items-center gap-5">
            {socials.map(({ url, label, color }) => (
              <a
                key={label}
                href={url!}
                target="_blank"
                rel="me noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium hover:underline"
                style={{ color: colors.primary.navy.DEFAULT }}
              >
                <span className="h-[22px] w-[22px] rounded" style={{ backgroundColor: color }} />
                {label}
              </a>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-gray-500">Cập nhật lần cuối: {author.updatedAt}</p>
        </Container>
      </Section>
    </>
  );
}
