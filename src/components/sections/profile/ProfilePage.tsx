"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import { User, Loader2, Lock, ChevronDown, Settings, Globe, Mail, Camera } from "lucide-react";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useAuth } from "@/contexts/AuthContext";
import { authApi } from "@/api/domains/auth";
import { extractApiError } from "@/lib/api-errors";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ProfileForm {
  fullName: string;
  avatar: string;
  bio: string;
  experience: string;
  certificates: string;
  socialLinks: string;
  personalWebsite: string;
  workEmail: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { account } = useAuth();
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [profileForm, setProfileForm] = useState<ProfileForm>({
    fullName: account?.name || "",
    avatar: "",
    bio: "",
    experience: "",
    certificates: "",
    socialLinks: "",
    personalWebsite: "",
    workEmail: account?.email || "",
  });
  const [form, setForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [popup, setPopup] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });
  const [showNetworkError, setShowNetworkError] = useState(false);

  const updateProfile = <K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) => {
    setProfileForm((prev) => ({ ...prev, [key]: value }));
  };

  const update = <K extends keyof PasswordForm>(key: K, value: PasswordForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!form.currentPassword) {
      errors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    }
    if (!form.newPassword) {
      errors.newPassword = "Vui lòng nhập mật khẩu mới";
    } else if (form.newPassword.length < 6) {
      errors.newPassword = "Mật khẩu mới tối thiểu 6 ký tự";
    }
    if (!form.confirmPassword) {
      errors.confirmPassword = "Vui lòng xác nhận mật khẩu mới";
    } else if (form.newPassword !== form.confirmPassword) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPopup((prev) => ({ ...prev, show: false }));
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);
    try {
      await authApi.changePassword({
        oldPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPopup({
        show: true,
        type: "success",
        message: "Đổi mật khẩu thành công!",
      });
      setIsExpanded(false);
      setTimeout(() => {
        router.push("/tin-tuc/quan-ly");
      }, 1200);
    } catch (err) {
      const { field, message, isNetworkError } = extractApiError(err);
      if (field) {
        setFieldErrors((prev) => ({ ...prev, [field]: message }));
      } else if (isNetworkError) {
        setShowNetworkError(true);
      } else {
        setPopup({ show: true, type: "error", message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputBaseClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 transition-colors outline-none focus:border-gray-400";
  const errorInputClass = "border-red-300 focus:border-red-400 bg-red-50/30";

  return (
    <Section padding="md" bg="gray">
      <div className="max-w-2xl mx-auto space-y-6">
        {showNetworkError && <NetworkErrorPopup onRetry={() => window.location.reload()} />}

        {popup.show && (
          <PopupNotification
            type={popup.type}
            message={popup.message}
            onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
            autoClose
          />
        )}

        {/* Profile card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
            <User size={36} className="text-gray-500" />
          </div>
          <div>
            <h1
              className="text-xl font-black"
              style={{ color: colors.primary.navy.DEFAULT }}
            >
              {account?.name || "Admin"}
            </h1>
            <p className="text-sm text-gray-500">{account?.email}</p>
          </div>
        </div>

        {/* Profile settings card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setIsProfileExpanded((prev) => !prev)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: colors.primary.navy.DEFAULT }}
              >
                <Settings size={18} className="text-white" />
              </div>
              <h2
                className="text-lg font-bold"
                style={{ color: colors.primary.navy.DEFAULT }}
              >
                Cài đặt thông tin cá nhân
              </h2>
            </div>
            <ChevronDown
              size={20}
              className={`text-gray-400 transition-transform duration-200 ${
                isProfileExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {isProfileExpanded && (
            <form className="px-6 pb-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
              {/* Full name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ tên
                </label>
                <input
                  type="text"
                  value={profileForm.fullName}
                  onChange={(e) => updateProfile("fullName", e.target.value)}
                  placeholder="Nhập họ tên"
                  className={inputBaseClass}
                />
              </div>

              {/* Avatar */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ảnh đại diện
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {profileForm.avatar ? (
                      <img
                        src={profileForm.avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera size={24} className="text-gray-400" />
                    )}
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Tải ảnh lên
                  </button>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Đoạn giới thiệu ngắn
                </label>
                <textarea
                  value={profileForm.bio}
                  onChange={(e) => updateProfile("bio", e.target.value)}
                  placeholder="Giới thiệu ngắn gọn về bản thân"
                  rows={3}
                  className={inputBaseClass}
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kinh nghiệm làm việc / dự án
                </label>
                <textarea
                  value={profileForm.experience}
                  onChange={(e) => updateProfile("experience", e.target.value)}
                  placeholder="Mô tả kinh nghiệm và các dự án đã tham gia"
                  rows={4}
                  className={inputBaseClass}
                />
              </div>

              {/* Certificates */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bằng cấp và chứng chỉ
                </label>
                <textarea
                  value={profileForm.certificates}
                  onChange={(e) => updateProfile("certificates", e.target.value)}
                  placeholder="Liệt kê bằng cấp, chứng chỉ liên quan"
                  rows={3}
                  className={inputBaseClass}
                />
              </div>

              {/* Social links */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Social links
                </label>
                <textarea
                  value={profileForm.socialLinks}
                  onChange={(e) => updateProfile("socialLinks", e.target.value)}
                  placeholder="Facebook, LinkedIn, Instagram,..."
                  rows={2}
                  className={inputBaseClass}
                />
              </div>

              {/* Personal website */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Web / blog cá nhân
                </label>
                <div className="relative">
                  <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    value={profileForm.personalWebsite}
                    onChange={(e) => updateProfile("personalWebsite", e.target.value)}
                    placeholder="https://example.com"
                    className={`${inputBaseClass} pl-10`}
                  />
                </div>
              </div>

              {/* Work email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mail công việc
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={profileForm.workEmail}
                    onChange={(e) => updateProfile("workEmail", e.target.value)}
                    placeholder="work@era.com.vn"
                    className={`${inputBaseClass} pl-10`}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto justify-center"
                  disabled
                >
                  Lưu thay đổi
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Change password card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: colors.primary.navy.DEFAULT }}
              >
                <Lock size={18} className="text-white" />
              </div>
              <h2
                className="text-lg font-bold"
                style={{ color: colors.primary.navy.DEFAULT }}
              >
                Đổi mật khẩu
              </h2>
            </div>
            <ChevronDown
              size={20}
              className={`text-gray-400 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {isExpanded && (
            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
            <div id="field-currentPassword">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mật khẩu hiện tại
              </label>
              <PasswordInput
                value={form.currentPassword}
                onChange={(e) => update("currentPassword", e.target.value)}
                placeholder="Nhập mật khẩu hiện tại"
                className={`${inputBaseClass} ${
                  fieldErrors.currentPassword ? errorInputClass : ""
                }`}
              />
              {fieldErrors.currentPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {fieldErrors.currentPassword}
                </p>
              )}
            </div>

            <div id="field-newPassword">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mật khẩu mới
              </label>
              <PasswordInput
                value={form.newPassword}
                onChange={(e) => update("newPassword", e.target.value)}
                placeholder="Tối thiểu 6 ký tự"
                className={`${inputBaseClass} ${
                  fieldErrors.newPassword ? errorInputClass : ""
                }`}
              />
              {fieldErrors.newPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {fieldErrors.newPassword}
                </p>
              )}
            </div>

            <div id="field-confirmPassword">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Xác nhận mật khẩu mới
              </label>
              <PasswordInput
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                placeholder="Nhập lại mật khẩu mới"
                className={`${inputBaseClass} ${
                  fieldErrors.confirmPassword ? errorInputClass : ""
                }`}
              />
              {fieldErrors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full sm:w-auto justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin mr-2" />
                ) : null}
                {isLoading ? "Đang lưu..." : "Đổi mật khẩu"}
              </Button>
            </div>
          </form>
          )}
        </div>
      </div>
    </Section>
  );
}
