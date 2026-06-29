"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import { Upload } from "lucide-react";
import { SelectField } from "@/components/ui/admin/SelectField";
import { recruitmentApi } from "@/api/domains/recruitment";
import { mediaApi } from "@/api/domains/media";
import { ApplySuccessPopup } from "./ApplySuccessPopup";
import type { JobPosting } from "@/types/api";

interface FormErrors {
  name?: string;
  phone?: string;
  position?: string;
  cv?: string;
  server?: string;
}

export function ApplySection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [position, setPosition] = useState("");
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    recruitmentApi.getPublishedJobs({ limit: 100 }).then(setJobs).catch(() => setJobs([]));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
      setErrors((prev) => ({ ...prev, cv: undefined }));
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setCvFile(e.dataTransfer.files[0]);
      setErrors((prev) => ({ ...prev, cv: undefined }));
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const inputClass = (error?: string) =>
    `w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm outline-none transition-colors ${
      error
        ? "border-red-400 focus:border-red-500"
        : "border-gray-200 focus:border-gray-400"
    }`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    const selectedJob = jobs.find((p) => p.title === position);

    const newErrors: FormErrors = {};
    if (!name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!selectedJob) newErrors.position = "Vui lòng chọn vị trí ứng tuyển";
    if (!cvFile) newErrors.cv = "Vui lòng tải lên CV";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const uploaded = await mediaApi.uploadFile(cvFile!, "recruitment");

      await recruitmentApi.submitApplication({
        jobPostingId: selectedJob!.id,
        fullName: name,
        phone,
        email: email || undefined,
        portfolioUrl: portfolio || undefined,
        cvMediaId: uploaded.id,
      });

      setSuccess(true);
      setName("");
      setPhone("");
      setEmail("");
      setPortfolio("");
      setPosition("");
      setCvFile(null);
    } catch (err) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Nộp đơn thất bại. Vui lòng thử lại.";
      setErrors({ server: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section padding="md" bg="white">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {/* Left: Form */}
            <div>
              <h2
                className="mb-1.5"
                style={{
                  color: colors.secondary.DEFAULT,
                  fontWeight: 900,
                  fontSize: "clamp(22px, 2.8vw, 32px)",
                  lineHeight: 1.2,
                  textTransform: "uppercase",
                }}
              >
                Ứng tuyển ngay
              </h2>
              <p
                className="mb-6"
                style={{
                  color: colors.gray[500],
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: 1.5,
                }}
              >
                Để lại thông tin, chúng tôi sẽ liên hệ với bạn trong thờі gian sớm nhất.
              </p>

              {success && (
                <ApplySuccessPopup onClose={() => setSuccess(false)} />
              )}

              {errors.server && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-medium text-red-700">{errors.server}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Ho ten + SDT */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: colors.gray[700] }}
                    >
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Nhập họ và tên"
                      className={inputClass(errors.name)}
                      style={{ color: colors.gray[800] }}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: colors.gray[700] }}
                    >
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      placeholder="090x xxx xxx"
                      className={inputClass(errors.phone)}
                      style={{ color: colors.gray[800] }}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: colors.gray[700] }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email của bạn"
                    className={inputClass()}
                    style={{ color: colors.gray[800] }}
                  />
                </div>

                {/* Portfolio */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: colors.gray[700] }}
                  >
                    Link portfolio
                  </label>
                  <input
                    type="url"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    placeholder="https://portfolio.com"
                    className={inputClass()}
                    style={{ color: colors.gray[800] }}
                  />
                </div>

                {/* Vi tri */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: colors.gray[700] }}
                  >
                    Vị trí mong muốn <span className="text-red-500">*</span>
                  </label>
                  <SelectField
                    value={position}
                    onChange={(value) => {
                      setPosition(value);
                      setErrors((prev) => ({ ...prev, position: undefined }));
                    }}
                    placeholder="Chọn vị trí ứng tuyển"
                    error={!!errors.position}
                    emptyClassName="text-gray-400"
                    options={jobs.map((p) => ({ value: p.title, label: p.title }))}
                    buttonClassName={inputClass(errors.position)}
                  />
                  {errors.position && <p className="mt-1 text-xs text-red-500">{errors.position}</p>}
                </div>

                {/* Upload CV */}
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: colors.gray[700] }}
                  >
                    Tải lên CV (định dạng PDF) <span className="text-red-500">*</span>
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className={`w-full rounded-xl border-2 border-dashed px-4 py-5 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                      errors.cv
                        ? "border-red-400 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
                    }`}
                  >
                    <Upload size={24} className="text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {cvFile ? cvFile.name : "Kéo thả hoặc click để chọn tệp"}
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  {errors.cv && <p className="mt-1 text-xs text-red-500">{errors.cv}</p>}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full shadow-lg hover:shadow-xl"
                >
                  Ứng tuyển ngay
                </Button>
              </form>
            </div>

            {/* Right: Image */}
            <div className="hidden lg:block h-full">
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
    </Section>
  );
}
