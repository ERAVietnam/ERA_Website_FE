"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import { User, Loader2, Lock } from "lucide-react";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useAuth } from "@/contexts/AuthContext";
import { authApi } from "@/api/domains/auth";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { getErrorMessage } from "@/lib/error-messages";

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfilePage() {
  const { account } = useAuth();
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
    } catch (err: any) {
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(
          err?.status,
          err?.data,
          "Đổi mật khẩu thất bại. Vui lòng thử lại.",
        ),
      });
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
        {popup.show && (
          <PopupNotification
            type={popup.type}
            message={popup.message}
            onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
            autoClose={popup.type === "success"}
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

        {/* Change password card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
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

          <form onSubmit={handleSubmit} className="space-y-5">
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
        </div>
      </div>
    </Section>
  );
}
