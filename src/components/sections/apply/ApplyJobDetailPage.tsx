"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { colors } from "@/lib/theme";
import { ROUTES } from "@/lib/routes";
import { Button } from "@/components/ui/Button";
import {
  MapPin,
  Briefcase,
  Clock,
  Users,
  Monitor,
  CalendarDays,
  Award,
  GraduationCap,
  Users2,
  Gift,
  ArrowRight,
  Upload,
  ChevronDown,
  Coins,
} from "lucide-react";
import type { JobFormData } from "./manage/ApplyManageForm";
import type { JobPosting } from "@/types/api";

type JobDetail = JobPosting | JobFormData | undefined;

function formatSalaryLabel(job?: JobDetail): string | null {
  const salary = job?.salary?.trim();
  return salary || null;
}

function formatDeadline(dateStr?: string | null): string | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

interface ApplyJobDetailPageProps {
  job?: JobDetail;
  otherJobs?: JobPosting[];
  isPreview?: boolean;
  defaultPosition?: string;
  availablePositions?: string[];
}

export function ApplyJobDetailPage({
  job,
  otherJobs = [],
  isPreview = false,
  defaultPosition,
  availablePositions,
}: ApplyJobDetailPageProps) {
  const title = job?.title || "Tin tuyển dụng";
  const location = job?.location || "—";
  const type = job?.type || "—";
  const workMode = job?.workMode;
  const experience = job?.experience;
  const salaryLabel = formatSalaryLabel(job);
  const deadlineLabel = formatDeadline(job?.deadline);
  const quantity = job?.quantity;

  const hasDescriptionHtml = !!job?.description && job.description.trim().length > 0;
  const hasRequirementsHtml = !!job?.requirements && job.requirements.trim().length > 0;
  const hasBenefitsHtml = !!job?.benefits && job.benefits.trim().length > 0;
  const hasWorkingTimeHtml = !!job?.workingTime && job.workingTime.trim().length > 0;

  return (
    <main className="min-h-screen bg-white pt-16 md:pt-0">
      {/* Breadcrumb */}
      {!isPreview && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2">
          <div className="flex items-center gap-2 text-sm">
            <Link href={ROUTES.home} className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0">Trang chủ</Link>
            <span className="text-gray-400 flex-shrink-0">/</span>
            <Link href={ROUTES.apply} className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0">Tuyển dụng</Link>
            <span className="text-gray-400 flex-shrink-0">/</span>
            <span className="truncate font-bold" style={{ color: colors.primary.DEFAULT, fontSize: "14px" }}>{title}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8 ${isPreview ? "pt-10 md:pt-14" : ""}`}>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1 min-w-0 max-w-2xl">
            <h1 className="mb-4" style={{ color: colors.primary.DEFAULT, fontWeight: 900, fontSize: "clamp(26px, 3.5vw, 40px)", lineHeight: 1.2 }}>
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 border border-gray-100">
                <MapPin size={14} style={{ color: colors.primary.DEFAULT }} />
                {location}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 border border-gray-100">
                <Briefcase size={14} style={{ color: colors.primary.DEFAULT }} />
                {type}
              </span>
              {workMode && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 border border-gray-100">
                  <Monitor size={14} style={{ color: colors.primary.DEFAULT }} />
                  {workMode}
                </span>
              )}
              {experience && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 border border-gray-100">
                  <Award size={14} style={{ color: colors.primary.DEFAULT }} />
                  {experience}
                </span>
              )}
              {salaryLabel && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 border border-gray-100 whitespace-nowrap">
                  <Coins size={14} style={{ color: colors.primary.DEFAULT }} />
                  {salaryLabel}
                </span>
              )}
              {typeof quantity === "number" && quantity > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 border border-gray-100">
                  <Users size={14} style={{ color: colors.primary.DEFAULT }} />
                  {quantity} ngườі
                </span>
              )}
              {deadlineLabel && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 border border-gray-100">
                  <CalendarDays size={14} style={{ color: colors.primary.DEFAULT }} />
                  Hạn nộp: {deadlineLabel}
                </span>
              )}
            </div>
          </div>
          {!isPreview && (
            <Button
              className="flex-shrink-0 rounded-full px-8 shadow-lg hover:shadow-xl"
              onClick={() => {
                document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Ứng Tuyển Ngay
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className={`grid grid-cols-1 gap-8 ${isPreview ? "" : "lg:grid-cols-3"}`}>
          {/* Left */}
          <div className={`space-y-8 ${isPreview ? "lg:col-span-3" : "lg:col-span-2"}`}>
            {/* Mô tả */}
            {hasDescriptionHtml && (
              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary.navy.DEFAULT }}>Mô tả công việc</h2>
                <div
                  className="ck-content text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: job!.description }}
                />
              </section>
            )}

            {/* Yêu cầu */}
            {hasRequirementsHtml && (
              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary.navy.DEFAULT }}>Yêu cầu công việc</h2>
                <div
                  className="ck-content text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: job!.requirements }}
                />
              </section>
            )}

            {/* Phúc lợi */}
            {hasBenefitsHtml && (
              <section className="pt-4">
                <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary.navy.DEFAULT }}>Đặc Quyền & Phúc Lợi</h2>
                <div className="rounded-2xl p-5 space-y-4" style={{ backgroundColor: colors.secondary.DEFAULT }}>
                  <div
                    className="ck-content leading-relaxed text-white [&_*]:!text-white"
                    dangerouslySetInnerHTML={{ __html: job!.benefits }}
                  />
                </div>
              </section>
            )}

            {/* Thờі gian làm việc */}
            {hasWorkingTimeHtml && (
              <section>
                <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary.navy.DEFAULT }}>Thờі gian làm việc</h2>
                <div
                  className="ck-content text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: job!.workingTime ?? "" }}
                />
              </section>
            )}
          </div>

          {/* Right sidebar */}
          {!isPreview && (
          <div className="space-y-6">
            {/* Cơ hội khác */}
            {otherJobs.length > 0 && (
              <div className="rounded-2xl border border-gray-200 shadow-lg p-5 bg-white">
                <h3
                  className="font-bold text-sm uppercase tracking-wide mb-4 -mx-5 -mt-5 px-5 py-3 text-white rounded-t-2xl"
                  style={{ backgroundColor: colors.primary.navy.DEFAULT }}
                >
                  CƠ HỘI KHÁC TẠI ERA
                </h3>
                <div className="space-y-0">
                  {otherJobs.map((j) => (
                    <div key={j.id} className="py-3 border-b border-gray-200 last:border-0">
                      <h4 className="font-semibold text-sm mb-1" style={{ color: colors.primary.navy.DEFAULT }}>{j.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-1.5">
                        <span>{j.location}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>{j.type}</span>
                      </div>
                      <Link href={`${ROUTES.applyDetail}/${encodeURIComponent(j.slug)}`} className="inline-flex items-center gap-1 text-xs font-medium transition-colors hover:font-bold" style={{ color: colors.primary.DEFAULT }}>
                        Xem chi tiết <ArrowRight size={12} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tham gia ERA */}
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: colors.primary.navy.DEFAULT }}>
              <div className="p-5">
                <h3 className="font-bold text-white text-sm mb-1">Tham gia ERA Vietnam</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  Trở thành một phần của mạng lưới môi giới bất động sản hàng đầu thế giới.
                </p>
              </div>
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600"
                  alt="ERA Team"
                  fill
                  className="object-cover"
                  sizes="400px"
                  unoptimized
                />
              </div>
            </div>
          </div>
          )}
        </div>
      </div>

      {!isPreview && (
        <JobApplyForm defaultPosition={defaultPosition ?? title} positions={availablePositions} />
      )}
    </main>
  );
}

function JobApplyForm({
  defaultPosition,
  positions,
}: {
  defaultPosition?: string;
  positions?: string[];
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [position, setPosition] = useState(defaultPosition ?? "");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setCvFile(e.target.files[0]);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) setCvFile(e.dataTransfer.files[0]);
  }, []);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !position) { alert("Vui lòng điền đầy đủ thông tin bắt buộc."); return; }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Ứng tuyển thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.");
      setName(""); setPhone(""); setEmail(""); setPortfolio(""); setPosition(""); setCvFile(null);
    }, 1200);
  };

  const positionOptions = positions?.length ? positions : [defaultPosition].filter(Boolean) as string[];

  return (
    <div id="apply-form" className="py-10" style={{ backgroundColor: "#f3f4f6" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            <div>
              <h2 className="mb-1" style={{ color: colors.secondary.DEFAULT, fontWeight: 900, fontSize: "clamp(22px, 2.8vw, 32px)", lineHeight: 1.2, textTransform: "uppercase" }}>
                Ứng tuyển ngay
              </h2>
              <p className="mb-6" style={{ color: colors.gray[500], fontSize: "14px", lineHeight: 1.5 }}>
                Để lại thông tin, chúng tôi sẽ liên hệ với bạn trong thờі gian sớm nhất.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.gray[700] }}>Họ và tên</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập họ tên của bạn" className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-gray-400 transition-colors" style={{ color: colors.gray[800] }} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.gray[700] }}>Số điện thoại</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="090x xxx xxx" className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-gray-400 transition-colors" style={{ color: colors.gray[800] }} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: colors.gray[700] }}>Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email của bạn" className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-gray-400 transition-colors" style={{ color: colors.gray[800] }} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: colors.gray[700] }}>Link portfolio</label>
                  <input type="url" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="https://portfolio.com" className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-gray-400 transition-colors" style={{ color: colors.gray[800] }} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: colors.gray[700] }}>Vị trí mong muốn</label>
                  <div className="relative">
                    <select value={position} onChange={(e) => setPosition(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-gray-400 transition-colors appearance-none cursor-pointer" style={{ color: position ? colors.gray[800] : colors.gray[400] }}>
                      <option value="" disabled>Chọn vị trí ứng tuyển</option>
                      {positionOptions.map((p) => (<option key={p} value={p}>{p}</option>))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: colors.gray[700] }}>Tải lên CV (định dạng PDF/Doc)</label>
                  <div onClick={() => fileInputRef.current?.click()} onDrop={handleDrop} onDragOver={handleDragOver} className="w-full rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-5 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-gray-400 hover:bg-gray-100 transition-colors">
                    <Upload size={24} className="text-gray-400" />
                    <span className="text-sm text-gray-500">{cvFile ? cvFile.name : "Kéo thả file hoặc click để chọn tệp"}</span>
                    <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                  </div>
                </div>

                <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="w-full shadow-lg hover:shadow-xl">
                  Ứng tuyển ngay
                </Button>
              </form>
            </div>

            <div className="hidden lg:block">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                <Image
                  src="/join/aca_join_section.webp"
                  alt="ERA Team"
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
