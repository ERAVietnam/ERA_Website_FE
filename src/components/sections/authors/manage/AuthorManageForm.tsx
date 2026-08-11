"use client";

import { useMemo, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { authorsApi } from "@/api/domains/authors";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/ui/admin/ImageUploadField";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";
import { usePopupNotification } from "@/hooks/usePopupNotification";
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";
import { showFieldError } from "@/lib/api-errors";
import { compressAndUploadImage } from "@/lib/uploadImage";
import { colors } from "@/lib/theme";
import type {
  Author,
  AuthorAward,
  AuthorExperience,
  CreateAuthorInput,
} from "@/types/api";

const CURRENT_YEAR = new Date().getFullYear();
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESERVED_SLUGS = ["quan-ly"];

function toSlug(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

interface AuthorFormState {
  slug: string;
  fullName: string;
  jobTitle: string;
  division: string;
  avatar: string;
  avatarAlt: string;
  bio: string;
  startYear: string;
  licenseNumber: string;
  licenseYear: string;
  associationMembers: string[];
  workEmail: string;
  zaloPhone: string;
  expertise: string[];
  areasServed: string[];
  experiences: AuthorExperience[];
  awards: AuthorAward[];
  pressMentions: { title: string; url: string; source: string; date: string }[];
  linkedinUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  reviewNote: string;
  isActive: boolean;
  isIndexed: boolean;
}

function authorToFormState(author?: Author | null): AuthorFormState {
  return {
    slug: author?.slug ?? "",
    fullName: author?.fullName ?? "",
    jobTitle: author?.jobTitle ?? "",
    division: author?.division ?? "",
    avatar: author?.avatar ?? "",
    avatarAlt: author?.avatarAlt ?? "",
    bio: author?.bio ?? "",
    startYear: author?.startYear ? String(author.startYear) : "",
    licenseNumber: author?.licenseNumber ?? "",
    licenseYear: author?.licenseYear ? String(author.licenseYear) : "",
    associationMembers: author?.associationMembers ?? [],
    workEmail: author?.workEmail ?? "",
    zaloPhone: author?.zaloPhone ?? "",
    expertise: author?.expertise ?? [],
    areasServed: author?.areasServed ?? [],
    experiences: author?.experiences ?? [],
    awards: author?.awards ?? [],
    pressMentions: (author?.pressMentions ?? []).map((p) => ({
      title: p.title,
      url: p.url ?? "",
      source: p.source,
      date: p.date ? p.date.slice(0, 10) : "",
    })),
    linkedinUrl: author?.linkedinUrl ?? "",
    facebookUrl: author?.facebookUrl ?? "",
    youtubeUrl: author?.youtubeUrl ?? "",
    reviewNote: author?.reviewNote ?? "",
    isActive: author?.isActive ?? true,
    isIndexed: author?.isIndexed ?? true,
  };
}

const inputBaseClass =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 transition-colors outline-none focus:border-gray-400";
const errorInputClass = "border-red-300 focus:border-red-400 bg-red-50/30";
const labelClass = "mb-2 block text-sm font-semibold text-gray-700";
const sectionHeadingClass = "mb-4 text-sm font-bold uppercase tracking-wide text-gray-500";
const errorTextClass = "mt-1 text-xs text-red-500";

interface AuthorManageFormProps {
  initialData?: Author | null;
  onSaved: (author: Author) => void;
  onCancel: () => void;
}

export default function AuthorManageForm({ initialData, onSaved, onCancel }: AuthorManageFormProps) {
  const { popup, showError, closePopup } = usePopupNotification();
  const { showNetworkError, handleApiError } = useApiErrorHandler(showError);
  const [form, setForm] = useState<AuthorFormState>(() => authorToFormState(initialData));
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const initialForm = useMemo(() => authorToFormState(initialData), [initialData]);
  const isDirty = JSON.stringify(form) !== JSON.stringify(initialForm) || avatarFile !== null;

  const updateForm = <K extends keyof AuthorFormState>(key: K, value: AuthorFormState[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      // Auto-gen slug từ họ tên khi slug chưa bị sửa tay
      if (key === "fullName" && (!prev.slug || prev.slug === toSlug(prev.fullName))) {
        next.slug = toSlug(value as string);
      }
      return next;
    });
    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const updateArrayItem = <K extends "associationMembers" | "expertise" | "areasServed">(
    key: K,
    index: number,
    value: string,
  ) => {
    const next = [...form[key]];
    next[index] = value;
    updateForm(key, next as AuthorFormState[K]);
  };

  const addArrayItem = <K extends "associationMembers" | "expertise" | "areasServed">(key: K) => {
    updateForm(key, [...form[key], ""] as AuthorFormState[K]);
  };

  const removeArrayItem = <K extends "associationMembers" | "expertise" | "areasServed">(
    key: K,
    index: number,
  ) => {
    updateForm(key, form[key].filter((_, i) => i !== index) as AuthorFormState[K]);
  };

  const updateObjectItem = <K extends "experiences" | "awards" | "pressMentions">(
    key: K,
    index: number,
    field: string,
    value: string,
  ) => {
    const next = form[key].map((item, i) => (i === index ? { ...item, [field]: value } : item));
    updateForm(key, next as AuthorFormState[K]);
  };

  const addObjectItem = <K extends "experiences" | "awards" | "pressMentions">(key: K) => {
    const empty =
      key === "experiences"
        ? { yearRange: "", name: "", role: "" }
        : key === "awards"
          ? { year: "", name: "", org: "" }
          : { title: "", url: "", source: "", date: "" };
    updateForm(key, [...form[key], empty] as AuthorFormState[K]);
  };

  const removeObjectItem = <K extends "experiences" | "awards" | "pressMentions">(
    key: K,
    index: number,
  ) => {
    updateForm(key, form[key].filter((_, i) => i !== index) as AuthorFormState[K]);
  };

  const setAvatarFromFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      showError("File avatar phải là hình ảnh.");
      return;
    }
    setAvatarFile(file);
    setForm((prev) => ({ ...prev, avatar: URL.createObjectURL(file) }));
    setFieldErrors((prev) => ({ ...prev, avatar: "" }));
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setForm((prev) => ({ ...prev, avatar: "" }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!form.fullName.trim()) {
      errors.fullName = "Vui lòng nhập họ tên tác giả.";
    } else if (form.fullName.trim().length > 100) {
      errors.fullName = "Họ tên tối đa 100 ký tự.";
    }

    if (!form.slug.trim()) {
      errors.slug = "Vui lòng nhập slug.";
    } else if (!SLUG_REGEX.test(form.slug.trim())) {
      errors.slug = "Slug chỉ gồm chữ thường, số và dấu gạch nối.";
    } else if (RESERVED_SLUGS.includes(form.slug.trim())) {
      errors.slug = "Slug này đã được hệ thống sử dụng, vui lòng chọn slug khác.";
    }

    if (form.avatar.trim() && !form.avatarAlt.trim()) {
      errors.avatarAlt = "Vui lòng nhập alt text cho ảnh đại diện.";
    }

    if (!form.bio.trim()) {
      errors.bio = "Vui lòng nhập giới thiệu tác giả.";
    } else if (form.bio.trim().length > 1000) {
      errors.bio = "Giới thiệu tối đa 1000 ký tự.";
    }

    const startYear = Number(form.startYear);
    if (!form.startYear.trim()) {
      errors.startYear = "Vui lòng nhập năm bắt đầu hoạt động.";
    } else if (!Number.isInteger(startYear) || startYear < 1900 || startYear > CURRENT_YEAR) {
      errors.startYear = `Năm bắt đầu phải từ 1900 đến ${CURRENT_YEAR}.`;
    }

    if (form.licenseNumber.trim()) {
      if (form.licenseNumber.trim().length !== 17) {
        errors.licenseNumber = "Số chứng chỉ hành nghề phải đúng 17 ký tự.";
      }
      const licenseYear = Number(form.licenseYear);
      if (!form.licenseYear.trim()) {
        errors.licenseYear = "Vui lòng nhập năm cấp chứng chỉ.";
      } else if (!Number.isInteger(licenseYear) || licenseYear < 1900 || licenseYear > CURRENT_YEAR) {
        errors.licenseYear = `Năm cấp phải từ 1900 đến ${CURRENT_YEAR}.`;
      }
    }

    if (form.workEmail.trim() && !EMAIL_REGEX.test(form.workEmail.trim())) {
      errors.workEmail = "Email không đúng định dạng.";
    }

    if (form.associationMembers.length > 5) {
      errors.associationMembers = "Tối đa 5 hội nhóm.";
    } else if (form.associationMembers.some((v) => !v.trim())) {
      errors.associationMembers = "Tên hội nhóm không được để trống.";
    }

    const expertise = form.expertise.map((v) => v.trim()).filter(Boolean);
    if (expertise.length === 0) {
      errors.expertise = "Vui lòng nhập ít nhất 1 chuyên môn.";
    } else if (form.expertise.length > 5) {
      errors.expertise = "Tối đa 5 chuyên môn.";
    } else if (form.expertise.some((v) => !v.trim())) {
      errors.expertise = "Chuyên môn không được để trống.";
    }

    const areasServed = form.areasServed.map((v) => v.trim()).filter(Boolean);
    if (areasServed.length === 0) {
      errors.areasServed = "Vui lòng nhập ít nhất 1 khu vực hoạt động.";
    } else if (form.areasServed.length > 3) {
      errors.areasServed = "Tối đa 3 khu vực hoạt động.";
    } else if (form.areasServed.some((v) => !v.trim())) {
      errors.areasServed = "Khu vực hoạt động không được để trống.";
    }

    if (form.experiences.length === 0) {
      errors.experiences = "Vui lòng thêm ít nhất 1 kinh nghiệm làm việc.";
    } else if (
      form.experiences.some((e) => !e.yearRange.trim() || !e.name.trim() || !e.role.trim())
    ) {
      errors.experiences = "Mỗi kinh nghiệm cần đủ: khoảng thời gian, tên tổ chức, vai trò.";
    }

    if (form.awards.some((a) => !a.year.trim() || !a.name.trim() || !a.org.trim())) {
      errors.awards = "Mỗi giải thưởng cần đủ: năm, tên giải, đơn vị trao.";
    }

    const today = new Date();
    today.setHours(23, 59, 59, 999);
    for (const p of form.pressMentions) {
      if (!p.title.trim() || !p.source.trim() || !p.date) {
        errors.pressMentions = "Mỗi bài báo cần đủ: tiêu đề, nguồn đăng, ngày đăng.";
        break;
      }
      if (p.url.trim() && !isValidUrl(p.url.trim())) {
        errors.pressMentions = "URL bài báo không hợp lệ.";
        break;
      }
      if (new Date(p.date) > today) {
        errors.pressMentions = "Ngày đăng bài báo không được là ngày tương lai.";
        break;
      }
    }

    const socials = [form.linkedinUrl.trim(), form.facebookUrl.trim(), form.youtubeUrl.trim()];
    if (socials.every((v) => !v)) {
      errors.socialUrls = "Cần ít nhất 1 trong 3 liên kết: LinkedIn, Facebook, YouTube.";
    } else if (socials.some((v) => v && !isValidUrl(v))) {
      errors.socialUrls = "Liên kết mạng xã hội phải là URL hợp lệ (http/https).";
    }

    return errors;
  };

  const scrollToFirstError = (errors: Record<string, string>) => {
    const firstKey = Object.keys(errors)[0];
    if (!firstKey) return;
    const element = document.getElementById(`field-${firstKey}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      const focusable = element.querySelector("input, textarea, select") as HTMLElement | null;
      focusable?.focus();
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    closePopup();

    const errors = validateForm();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      scrollToFirstError(errors);
      return;
    }

    setIsSaving(true);
    try {
      let avatarUrl = form.avatar.trim() || null;
      if (avatarFile) {
        const upload = await compressAndUploadImage(avatarFile, "authors", {
          maxSizeMB: 1,
          maxWidthOrHeight: 1200,
          filenameBase: form.fullName.trim(),
        });
        avatarUrl = upload.url;
      }

      const payload: CreateAuthorInput = {
        slug: form.slug.trim(),
        fullName: form.fullName.trim(),
        jobTitle: form.jobTitle.trim() || null,
        division: form.division.trim() || null,
        avatar: avatarUrl,
        avatarAlt: form.avatarAlt.trim() || null,
        bio: form.bio.trim(),
        startYear: Number(form.startYear),
        licenseNumber: form.licenseNumber.trim() || null,
        licenseYear: form.licenseNumber.trim() ? Number(form.licenseYear) : null,
        associationMembers: form.associationMembers.map((v) => v.trim()).filter(Boolean),
        workEmail: form.workEmail.trim() || null,
        zaloPhone: form.zaloPhone.trim() || null,
        expertise: form.expertise.map((v) => v.trim()).filter(Boolean),
        areasServed: form.areasServed.map((v) => v.trim()).filter(Boolean),
        experiences: form.experiences.map((e) => ({
          yearRange: e.yearRange.trim(),
          name: e.name.trim(),
          role: e.role.trim(),
        })),
        awards: form.awards.length
          ? form.awards.map((a) => ({
              year: a.year.trim(),
              name: a.name.trim(),
              org: a.org.trim(),
            }))
          : null,
        pressMentions: form.pressMentions.length
          ? form.pressMentions.map((p) => ({
              title: p.title.trim(),
              url: p.url.trim() || null,
              source: p.source.trim(),
              date: p.date,
            }))
          : null,
        linkedinUrl: form.linkedinUrl.trim() || null,
        facebookUrl: form.facebookUrl.trim() || null,
        youtubeUrl: form.youtubeUrl.trim() || null,
        reviewNote: form.reviewNote.trim() || null,
        isActive: form.isActive,
        isIndexed: form.isIndexed,
      };

      const saved = initialData
        ? await authorsApi.updateAuthor(initialData.id, payload)
        : await authorsApi.createAuthor(payload);

      setAvatarFile(null);
      onSaved(saved);
    } catch (err) {
      handleApiError(err, {
        onFieldError: (field, message) => showFieldError(field, message, setFieldErrors),
      });
    } finally {
      setIsSaving(false);
    }
  };

  const requiredMark = <span style={{ color: colors.primary.DEFAULT }}>*</span>;

  const renderStringRepeater = (
    key: "associationMembers" | "expertise" | "areasServed",
    config: { placeholder: string; addLabel: string; max?: number; hint: string },
  ) => (
    <div id={`field-${key}`}>
      <div className="space-y-2">
        {form[key].map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              value={value}
              onChange={(e) => updateArrayItem(key, index, e.target.value)}
              placeholder={config.placeholder}
              className={`${inputBaseClass} ${fieldErrors[key] ? errorInputClass : ""}`}
            />
            <button
              type="button"
              aria-label={`Xóa mục ${index + 1}`}
              onClick={() => removeArrayItem(key, index)}
              className="shrink-0 rounded-lg border border-gray-200 px-3 py-2 text-gray-400 transition-colors hover:border-red-300 hover:text-red-500"
            >
              <span className="text-lg leading-none">−</span>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem(key)}
          disabled={config.max !== undefined && form[key].length >= config.max}
          className="flex items-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="text-lg leading-none">+</span> {config.addLabel}
        </button>
        <p className="text-xs text-gray-400">{config.hint}</p>
      </div>
      {fieldErrors[key] && <p className={errorTextClass}>{fieldErrors[key]}</p>}
    </div>
  );

  const repeaterCardClass = "rounded-xl border border-gray-200 bg-gray-50/40 p-4";
  const repeaterRemoveBtnClass =
    "shrink-0 self-start rounded-lg border border-gray-200 px-3 py-2 text-gray-400 transition-colors hover:border-red-300 hover:text-red-500";
  const repeaterAddBtnClass =
    "flex items-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <>
      {showNetworkError && <NetworkErrorPopup onRetry={() => window.location.reload()} />}

      {popup.show && (
        <PopupNotification
          type={popup.type}
          message={popup.message}
          onClose={closePopup}
          autoClose={popup.type === "success"}
          autoCloseMs={1000}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-[1fr_11rem] gap-6 items-start">
        <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-black" style={{ color: colors.primary.navy.DEFAULT }}>
              {initialData ? "Chỉnh sửa tác giả" : "Tạo tác giả mới"}
            </h2>
            <Button variant="ghost" isIconOnly size="sm" onClick={onCancel}>
              <X size={20} className="text-gray-500" />
            </Button>
          </div>

          <form id="author-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Thông tin cơ bản */}
            <section>
              <h3 className={sectionHeadingClass}>Thông tin cơ bản</h3>
              <div className="space-y-5">
                <div id="field-fullName">
                  <label className={labelClass}>Họ tên {requiredMark}</label>
                  <input
                    value={form.fullName}
                    onChange={(e) => updateForm("fullName", e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className={`${inputBaseClass} ${fieldErrors.fullName ? errorInputClass : ""}`}
                  />
                  {fieldErrors.fullName && <p className={errorTextClass}>{fieldErrors.fullName}</p>}
                </div>

                <div id="field-slug">
                  <label className={labelClass}>Slug {requiredMark}</label>
                  <input
                    value={form.slug}
                    onChange={(e) => updateForm("slug", toSlug(e.target.value))}
                    placeholder="nguyen-van-a"
                    className={`${inputBaseClass} ${fieldErrors.slug ? errorInputClass : ""}`}
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    URL trang tác giả: /tac-gia/{form.slug || "..."}
                  </p>
                  {fieldErrors.slug && <p className={errorTextClass}>{fieldErrors.slug}</p>}
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div id="field-jobTitle">
                    <label className={labelClass}>Chức danh</label>
                    <input
                      value={form.jobTitle}
                      onChange={(e) => updateForm("jobTitle", e.target.value)}
                      placeholder="Ví dụ: Chuyên viên tư vấn cao cấp"
                      className={`${inputBaseClass} ${fieldErrors.jobTitle ? errorInputClass : ""}`}
                    />
                    {fieldErrors.jobTitle && <p className={errorTextClass}>{fieldErrors.jobTitle}</p>}
                  </div>
                  <div id="field-division">
                    <label className={labelClass}>Bộ phận</label>
                    <input
                      value={form.division}
                      onChange={(e) => updateForm("division", e.target.value)}
                      placeholder="Ví dụ: Kinh doanh dự án"
                      className={`${inputBaseClass} ${fieldErrors.division ? errorInputClass : ""}`}
                    />
                    {fieldErrors.division && <p className={errorTextClass}>{fieldErrors.division}</p>}
                  </div>
                </div>

                <ImageUploadField
                  id="field-avatar"
                  error={fieldErrors.avatar}
                  errorClassName={errorTextClass}
                  preview={form.avatar.trim() ? form.avatar : undefined}
                  previewAlt={form.avatarAlt || "Avatar preview"}
                  previewVariant="avatar-row"
                  fileName={avatarFile?.name || "Avatar hiện tại"}
                  fileStatusText={
                    avatarFile ? "Ảnh sẽ được upload vào thư mục authors" : "Đã có ảnh đại diện"
                  }
                  clearButtonText="Xoá ảnh"
                  onFileSelect={setAvatarFromFile}
                  onClear={handleRemoveAvatar}
                  hintText="Hỗ trợ: JPG, PNG, WEBP, GIF"
                  dropzoneSize="sm"
                  dropzoneIcon={<Upload size={28} className="text-gray-400" />}
                  alwaysShowDropzone
                  validateImageType={false}
                />

                <div id="field-avatarAlt">
                  <label className={labelClass}>
                    Alt text ảnh đại diện {form.avatar.trim() ? requiredMark : null}
                  </label>
                  <input
                    value={form.avatarAlt}
                    onChange={(e) => updateForm("avatarAlt", e.target.value)}
                    placeholder="Mô tả ảnh đại diện (phục vụ SEO)"
                    className={`${inputBaseClass} ${fieldErrors.avatarAlt ? errorInputClass : ""}`}
                  />
                  {fieldErrors.avatarAlt && <p className={errorTextClass}>{fieldErrors.avatarAlt}</p>}
                </div>

                <div id="field-bio">
                  <label className={labelClass}>Giới thiệu {requiredMark}</label>
                  <textarea
                    value={form.bio}
                    onChange={(e) => updateForm("bio", e.target.value)}
                    placeholder="Giới thiệu ngắn về tác giả (plain text, tối đa 1000 ký tự)"
                    rows={4}
                    className={`${inputBaseClass} resize-y ${fieldErrors.bio ? errorInputClass : ""}`}
                  />
                  <p className="mt-1 text-xs text-gray-400">{form.bio.length}/1000 ký tự</p>
                  {fieldErrors.bio && <p className={errorTextClass}>{fieldErrors.bio}</p>}
                </div>

                <div id="field-startYear" className="max-w-xs">
                  <label className={labelClass}>Năm bắt đầu hoạt động {requiredMark}</label>
                  <input
                    type="number"
                    value={form.startYear}
                    onChange={(e) => updateForm("startYear", e.target.value)}
                    placeholder={`Ví dụ: ${CURRENT_YEAR - 5}`}
                    className={`${inputBaseClass} ${fieldErrors.startYear ? errorInputClass : ""}`}
                  />
                  {fieldErrors.startYear && <p className={errorTextClass}>{fieldErrors.startYear}</p>}
                </div>
              </div>
            </section>

            {/* Chứng chỉ & hội nhóm */}
            <section className="border-t border-gray-100 pt-6">
              <h3 className={sectionHeadingClass}>Chứng chỉ &amp; hội nhóm</h3>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div id="field-licenseNumber">
                    <label className={labelClass}>Số chứng chỉ hành nghề</label>
                    <input
                      value={form.licenseNumber}
                      onChange={(e) => updateForm("licenseNumber", e.target.value)}
                      placeholder="17 ký tự"
                      className={`${inputBaseClass} ${fieldErrors.licenseNumber ? errorInputClass : ""}`}
                    />
                    {fieldErrors.licenseNumber && (
                      <p className={errorTextClass}>{fieldErrors.licenseNumber}</p>
                    )}
                  </div>
                  <div id="field-licenseYear">
                    <label className={labelClass}>
                      Năm cấp {form.licenseNumber.trim() ? requiredMark : null}
                    </label>
                    <input
                      type="number"
                      value={form.licenseYear}
                      onChange={(e) => updateForm("licenseYear", e.target.value)}
                      placeholder="Ví dụ: 2020"
                      className={`${inputBaseClass} ${fieldErrors.licenseYear ? errorInputClass : ""}`}
                    />
                    {fieldErrors.licenseYear && (
                      <p className={errorTextClass}>{fieldErrors.licenseYear}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Hội nhóm thành viên</label>
                  {renderStringRepeater("associationMembers", {
                    placeholder: "Tên hội nhóm",
                    addLabel: "Thêm hội nhóm",
                    max: 5,
                    hint: "Tối đa 5 hội nhóm, có thể để trống.",
                  })}
                </div>
              </div>
            </section>

            {/* Liên hệ */}
            <section className="border-t border-gray-100 pt-6">
              <h3 className={sectionHeadingClass}>Liên hệ</h3>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div id="field-workEmail">
                    <label className={labelClass}>Email công việc</label>
                    <input
                      type="email"
                      value={form.workEmail}
                      onChange={(e) => updateForm("workEmail", e.target.value)}
                      placeholder="email@era.com.vn"
                      className={`${inputBaseClass} ${fieldErrors.workEmail ? errorInputClass : ""}`}
                    />
                    {fieldErrors.workEmail && <p className={errorTextClass}>{fieldErrors.workEmail}</p>}
                  </div>
                  <div id="field-zaloPhone">
                    <label className={labelClass}>SĐT Zalo</label>
                    <input
                      value={form.zaloPhone}
                      onChange={(e) => updateForm("zaloPhone", e.target.value)}
                      placeholder="09xxxxxxxx"
                      className={`${inputBaseClass} ${fieldErrors.zaloPhone ? errorInputClass : ""}`}
                    />
                    {fieldErrors.zaloPhone && <p className={errorTextClass}>{fieldErrors.zaloPhone}</p>}
                  </div>
                </div>

                <div id="field-socialUrls">
                  <label className={labelClass}>Mạng xã hội {requiredMark}</label>
                  <div className="space-y-3">
                    <input
                      value={form.linkedinUrl}
                      onChange={(e) => updateForm("linkedinUrl", e.target.value)}
                      placeholder="URL LinkedIn (https://...)"
                      className={`${inputBaseClass} ${fieldErrors.socialUrls ? errorInputClass : ""}`}
                    />
                    <input
                      value={form.facebookUrl}
                      onChange={(e) => updateForm("facebookUrl", e.target.value)}
                      placeholder="URL Facebook (https://...)"
                      className={`${inputBaseClass} ${fieldErrors.socialUrls ? errorInputClass : ""}`}
                    />
                    <input
                      value={form.youtubeUrl}
                      onChange={(e) => updateForm("youtubeUrl", e.target.value)}
                      placeholder="URL YouTube (https://...)"
                      className={`${inputBaseClass} ${fieldErrors.socialUrls ? errorInputClass : ""}`}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    Cần ít nhất 1 trong 3 liên kết: LinkedIn, Facebook, YouTube.
                  </p>
                  {fieldErrors.socialUrls && <p className={errorTextClass}>{fieldErrors.socialUrls}</p>}
                </div>
              </div>
            </section>

            {/* Chuyên môn */}
            <section className="border-t border-gray-100 pt-6">
              <h3 className={sectionHeadingClass}>Chuyên môn</h3>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Lĩnh vực chuyên môn {requiredMark}</label>
                  {renderStringRepeater("expertise", {
                    placeholder: "Ví dụ: Bất động sản nghỉ dưỡng",
                    addLabel: "Thêm chuyên môn",
                    max: 5,
                    hint: "Từ 1 đến 5 chuyên môn.",
                  })}
                </div>
                <div>
                  <label className={labelClass}>Khu vực hoạt động {requiredMark}</label>
                  {renderStringRepeater("areasServed", {
                    placeholder: "Ví dụ: Bình Châu, Hồ Tràm",
                    addLabel: "Thêm khu vực",
                    max: 3,
                    hint: "Từ 1 đến 3 khu vực.",
                  })}
                </div>
              </div>
            </section>

            {/* Kinh nghiệm làm việc */}
            <section className="border-t border-gray-100 pt-6">
              <h3 className={sectionHeadingClass}>Kinh nghiệm làm việc {requiredMark}</h3>
              <div id="field-experiences">
                <div className="space-y-3">
                  {form.experiences.map((item, index) => (
                    <div key={index} className={repeaterCardClass}>
                      <div className="flex items-start gap-2">
                        <div className="flex-1 space-y-3">
                          <div>
                            <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                              Khoảng thời gian {index + 1}
                            </label>
                            <input
                              value={item.yearRange}
                              onChange={(e) => updateObjectItem("experiences", index, "yearRange", e.target.value)}
                              placeholder="Ví dụ: 2015 - 2020"
                              className={inputBaseClass}
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-xs font-semibold text-gray-500">Tên tổ chức</label>
                            <input
                              value={item.name}
                              onChange={(e) => updateObjectItem("experiences", index, "name", e.target.value)}
                              placeholder="Ví dụ: ERA Vietnam"
                              className={inputBaseClass}
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-xs font-semibold text-gray-500">Vai trò</label>
                            <input
                              value={item.role}
                              onChange={(e) => updateObjectItem("experiences", index, "role", e.target.value)}
                              placeholder="Ví dụ: Chuyên viên tư vấn"
                              className={inputBaseClass}
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          aria-label={`Xóa kinh nghiệm ${index + 1}`}
                          onClick={() => removeObjectItem("experiences", index)}
                          className={repeaterRemoveBtnClass}
                        >
                          <span className="text-lg leading-none">−</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => addObjectItem("experiences")} className={repeaterAddBtnClass}>
                    <span className="text-lg leading-none">+</span> Thêm kinh nghiệm
                  </button>
                  <p className="text-xs text-gray-400">Ít nhất 1 kinh nghiệm làm việc.</p>
                </div>
                {fieldErrors.experiences && <p className={errorTextClass}>{fieldErrors.experiences}</p>}
              </div>
            </section>

            {/* Giải thưởng */}
            <section className="border-t border-gray-100 pt-6">
              <h3 className={sectionHeadingClass}>Giải thưởng</h3>
              <div id="field-awards">
                <div className="space-y-3">
                  {form.awards.map((item, index) => (
                    <div key={index} className={repeaterCardClass}>
                      <div className="flex items-start gap-2">
                        <div className="flex-1 space-y-3">
                          <div>
                            <label className="mb-1.5 block text-xs font-semibold text-gray-500">Năm</label>
                            <input
                              value={item.year}
                              onChange={(e) => updateObjectItem("awards", index, "year", e.target.value)}
                              placeholder="Ví dụ: 2023"
                              className={inputBaseClass}
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-xs font-semibold text-gray-500">Tên giải thưởng</label>
                            <input
                              value={item.name}
                              onChange={(e) => updateObjectItem("awards", index, "name", e.target.value)}
                              placeholder="Tên giải thưởng"
                              className={inputBaseClass}
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-xs font-semibold text-gray-500">Đơn vị trao giải</label>
                            <input
                              value={item.org}
                              onChange={(e) => updateObjectItem("awards", index, "org", e.target.value)}
                              placeholder="Đơn vị trao giải"
                              className={inputBaseClass}
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          aria-label={`Xóa giải thưởng ${index + 1}`}
                          onClick={() => removeObjectItem("awards", index)}
                          className={repeaterRemoveBtnClass}
                        >
                          <span className="text-lg leading-none">−</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => addObjectItem("awards")} className={repeaterAddBtnClass}>
                    <span className="text-lg leading-none">+</span> Thêm giải thưởng
                  </button>
                  <p className="text-xs text-gray-400">Có thể để trống.</p>
                </div>
                {fieldErrors.awards && <p className={errorTextClass}>{fieldErrors.awards}</p>}
              </div>
            </section>

            {/* Báo chí đưa tin */}
            <section className="border-t border-gray-100 pt-6">
              <h3 className={sectionHeadingClass}>Báo chí đưa tin</h3>
              <div id="field-pressMentions">
                <div className="space-y-3">
                  {form.pressMentions.map((item, index) => (
                    <div key={index} className={repeaterCardClass}>
                      <div className="flex items-start gap-2">
                        <div className="flex-1 space-y-3">
                          <div>
                            <label className="mb-1.5 block text-xs font-semibold text-gray-500">Tiêu đề bài báo</label>
                            <input
                              value={item.title}
                              onChange={(e) => updateObjectItem("pressMentions", index, "title", e.target.value)}
                              placeholder="Tiêu đề bài báo"
                              className={inputBaseClass}
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                              URL bài báo (không bắt buộc)
                            </label>
                            <input
                              value={item.url}
                              onChange={(e) => updateObjectItem("pressMentions", index, "url", e.target.value)}
                              placeholder="https://..."
                              className={inputBaseClass}
                            />
                          </div>
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div>
                              <label className="mb-1.5 block text-xs font-semibold text-gray-500">Nguồn đăng</label>
                              <input
                                value={item.source}
                                onChange={(e) => updateObjectItem("pressMentions", index, "source", e.target.value)}
                                placeholder="Ví dụ: VnExpress"
                                className={inputBaseClass}
                              />
                            </div>
                            <div>
                              <label className="mb-1.5 block text-xs font-semibold text-gray-500">Ngày đăng</label>
                              <input
                                type="date"
                                value={item.date}
                                onChange={(e) => updateObjectItem("pressMentions", index, "date", e.target.value)}
                                className={inputBaseClass}
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          aria-label={`Xóa bài báo ${index + 1}`}
                          onClick={() => removeObjectItem("pressMentions", index)}
                          className={repeaterRemoveBtnClass}
                        >
                          <span className="text-lg leading-none">−</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => addObjectItem("pressMentions")} className={repeaterAddBtnClass}>
                    <span className="text-lg leading-none">+</span> Thêm bài báo
                  </button>
                  <p className="text-xs text-gray-400">Có thể để trống.</p>
                </div>
                {fieldErrors.pressMentions && <p className={errorTextClass}>{fieldErrors.pressMentions}</p>}
              </div>
            </section>

            {/* Cài đặt hiển thị */}
            <section className="border-t border-gray-100 pt-6">
              <h3 className={sectionHeadingClass}>Cài đặt hiển thị</h3>
              <div className="space-y-5">
                <div id="field-reviewNote">
                  <label className={labelClass}>Ghi chú kiểm duyệt</label>
                  <textarea
                    value={form.reviewNote}
                    onChange={(e) => updateForm("reviewNote", e.target.value)}
                    placeholder="Hiển thị ở đầu tab 'Bài đã kiểm duyệt' trên trang tác giả (không bắt buộc)"
                    rows={3}
                    className={`${inputBaseClass} resize-y ${fieldErrors.reviewNote ? errorInputClass : ""}`}
                  />
                  {fieldErrors.reviewNote && <p className={errorTextClass}>{fieldErrors.reviewNote}</p>}
                </div>

                <div className="flex flex-col gap-3">
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) => updateForm("isActive", e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">
                      Hiển thị công khai <span className="text-xs text-gray-400">(tắt = ẩn trang tác giả khỏi website)</span>
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={form.isIndexed}
                      onChange={(e) => updateForm("isIndexed", e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">
                      Cho phép Google index <span className="text-xs text-gray-400">(tắt = noindex + loại khỏi sitemap)</span>
                    </span>
                  </label>
                </div>
              </div>
            </section>
          </form>
        </div>

        <div className="hidden md:block sticky top-20 self-start">
          <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <button
              type="submit"
              form="author-form"
              disabled={isSaving || !isDirty}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 bg-white px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              style={{ borderColor: colors.primary.navy.DEFAULT, color: colors.primary.navy.DEFAULT }}
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : null}
              {isSaving ? "Đang lưu..." : "Lưu"}
            </button>

            <div className="min-h-[120px]" />

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full justify-center bg-white"
              onClick={onCancel}
              disabled={isSaving}
            >
              Hủy
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 md:hidden">
          <Button type="button" variant="outline" size="sm" className="bg-white" onClick={onCancel}>
            Hủy
          </Button>
          <Button type="submit" form="author-form" variant="primary" size="sm" disabled={isSaving || !isDirty}>
            {isSaving ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      </div>
    </>
  );
}
