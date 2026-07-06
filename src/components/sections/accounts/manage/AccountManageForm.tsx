"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import { X, Loader2 } from "lucide-react";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { accountsApi } from "@/api/domains/accounts";
import { createAccountSchema, updateAccountSchema } from "@/schemas/account.schema";
import { extractApiError, showFieldError } from "@/lib/api-errors";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useAuth } from "@/contexts/AuthContext";
import type { ManagementAccount, Permission } from "@/types/api";

interface Props {
  initialData?: ManagementAccount;
  onSave: (account?: ManagementAccount) => void;
  onCancel: () => void;
}

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isActive: boolean;
}

function accountToFormState(account?: ManagementAccount): FormState {
  if (!account) {
    return { name: "", email: "", password: "", confirmPassword: "", isActive: true };
  }
  return {
    name: account.name,
    email: account.email,
    password: "",
    confirmPassword: "",
    isActive: account.isActive,
  };
}

const moduleLabels: Record<string, string> = {
  news: "Tin tức",
  auth: "Tài khoản",
  recruitment: "Tuyển dụng",
  projects: "Dự án",
  magazine: "E-Magazine",
  agents: "Agent",
  honors: "Vinh danh và Hệ thống",
};

const resourceLabels: Record<string, string> = {
  categories: "Danh mục",
  articles: "Bài viết",
  accounts: "Tài khoản",
  permissions: "Quyền",
  jobs: "Tin tuyển dụng",
  all: "Tất cả",
};

const actionLabels: Record<string, string> = {
  view: "Xem",
  create: "Thêm",
  update: "Sửa",
  delete: "Xóa",
  toggle: "Ẩn/hiện",
  publish: "Duyệt",
  assign: "Gán quyền",
};

const EXCLUDED_ACTIONS = new Set(["close", "unpublish"]);

function groupPermissions(permissions: Permission[]) {
  const groups: Record<string, Record<string, Permission[]>> = {};
  for (const p of permissions) {
    if (EXCLUDED_ACTIONS.has(p.action)) continue;
    if (!groups[p.module]) groups[p.module] = {};
    if (!groups[p.module][p.resource]) groups[p.module][p.resource] = [];
    groups[p.module][p.resource].push(p);
  }
  for (const moduleKey of Object.keys(groups)) {
    for (const resource of Object.keys(groups[moduleKey])) {
      groups[moduleKey][resource].sort((a, b) => {
        const scopeOrder = a.scope === "all" ? 0 : 1;
        const scopeOrderB = b.scope === "all" ? 0 : 1;
        if (scopeOrder !== scopeOrderB) return scopeOrder - scopeOrderB;
        const actionOrder = Object.keys(actionLabels).indexOf(a.action);
        const actionOrderB = Object.keys(actionLabels).indexOf(b.action);
        if (actionOrder !== actionOrderB) return actionOrder - actionOrderB;
        return a.name.localeCompare(b.name);
      });
    }
  }
  return groups;
}

function formatScope(scope: string): string {
  if (scope === "all") return "Tất cả";
  const map: Record<string, string> = {
    market: "Tin thị trường",
    project: "Tin dự án",
    era: "ERA News",
    press: "Thông cáo báo chí",
  };
  return map[scope] || scope;
}

const NEWS_ARTICLE_SCOPE_ORDER = ["all", "market", "project", "era", "press"];

const newsArticleScopeLabels: Record<string, string> = {
  all: "Bài viết",
  market: "Tin thị trường",
  project: "Tin dự án",
  era: "ERA News",
  press: "Thông cáo báo chí",
};

function getNewsArticleSections(perms: Permission[]): { scope: string; label: string; perms: Permission[] }[] {
  const byScope: Record<string, Permission[]> = {};
  for (const p of perms) {
    if (!byScope[p.scope]) byScope[p.scope] = [];
    byScope[p.scope].push(p);
  }
  return NEWS_ARTICLE_SCOPE_ORDER
    .filter((scope) => byScope[scope]?.length)
    .map((scope) => ({
      scope,
      label: newsArticleScopeLabels[scope] || formatScope(scope),
      perms: byScope[scope],
    }));
}

function getResourceSections(
  module: string,
  resource: string,
  perms: Permission[],
): { key: string; label: string; perms: Permission[] }[] {
  if (module === "news" && resource === "articles") {
    return getNewsArticleSections(perms).map((section) => ({
      key: `${resource}-${section.scope}`,
      label: section.label,
      perms: section.perms,
    }));
  }
  return [
    {
      key: resource,
      label: resourceLabels[resource] || (resource === "all" ? moduleLabels[module] : resource) || resource,
      perms,
    },
  ];
}

export function AccountManageForm({ initialData, onSave, onCancel }: Props) {
  const { hasPermission } = useAuth();
  const [form, setForm] = useState<FormState>(() => accountToFormState(initialData));
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<Set<string>>(
    () => new Set(initialData?.permissions.map((p) => p.id) ?? []),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [popup, setPopup] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showNetworkError, setShowNetworkError] = useState(false);

  const initialForm = useMemo(() => accountToFormState(initialData), [initialData]);
  const initialPermissionIds = useMemo(
    () => new Set(initialData?.permissions.map((p) => p.id) ?? []),
    [initialData],
  );

  const isDirty =
    JSON.stringify(form) !== JSON.stringify(initialForm) ||
    JSON.stringify([...selectedPermissionIds].sort()) !==
      JSON.stringify([...initialPermissionIds].sort());

  useEffect(() => {
    queueMicrotask(() => {
      setForm(accountToFormState(initialData));
      setSelectedPermissionIds(new Set(initialData?.permissions.map((p) => p.id) ?? []));
    });
  }, [initialData]);

  useEffect(() => {
    accountsApi
      .getPermissions()
      .then(setPermissions)
      .catch((err) => {
        const { message, isNetworkError } = extractApiError(err);
        if (isNetworkError) {
          setShowNetworkError(true);
        } else {
          setPopup({ show: true, type: "error", message: `Không thể tải danh sách quyền: ${message}` });
        }
        setPermissions([]);
      });
  }, []);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const togglePermission = (id: string) => {
    const perm = permissions.find((p) => p.id === id);
    if (!perm) return;

    setSelectedPermissionIds((prev) => {
      const next = new Set(prev);
      const isSelecting = !next.has(id);

      if (!isSelecting) {
        next.delete(id);
        return next;
      }

      next.add(id);

      const sameResource = (p: Permission) =>
        p.module === perm.module &&
        p.resource === perm.resource &&
        p.action === perm.action;

      if (perm.scope === "all") {
        // Chọn all -> bỏ tất cả scope tương ứng
        permissions
          .filter((p) => sameResource(p) && p.scope !== "all")
          .forEach((p) => next.delete(p.id));
      } else {
        // Chọn scope -> nếu đã chọn đủ tất cả scope thì chuyển sang all
        const scopePerms = permissions.filter(
          (p) => sameResource(p) && p.scope !== "all",
        );
        const allScopeSelected = scopePerms.every((p) => next.has(p.id));
        if (allScopeSelected) {
          const allPerm = permissions.find(
            (p) => sameResource(p) && p.scope === "all",
          );
          if (allPerm) {
            next.add(allPerm.id);
            scopePerms.forEach((p) => next.delete(p.id));
          }
        }
      }

      return next;
    });
  };

  const toggleAll = (ids: string[], checked: boolean) => {
    setSelectedPermissionIds((prev) => {
      const next = new Set(prev);
      const perms = permissions.filter((p) => ids.includes(p.id));
      const allPerm = perms.find((p) => p.scope === "all");
      const scopePerms = perms.filter((p) => p.scope !== "all");

      if (checked) {
        // Chọn tất cả -> chỉ lưu all, bỏ scope
        if (allPerm) next.add(allPerm.id);
        scopePerms.forEach((p) => next.delete(p.id));
      } else {
        // Bỏ chọn tất cả
        perms.forEach((p) => next.delete(p.id));
      }

      return next;
    });
  };

  const handleCancelRequest = () => {
    if (isDirty) {
      setShowCancelConfirm(true);
    } else {
      onCancel();
    }
  };

  const handleConfirmCancel = () => {
    setShowCancelConfirm(false);
    onCancel();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPopup((prev) => ({ ...prev, show: false }));
    setFieldErrors({});

    const permissionIds = Array.from(selectedPermissionIds);
    const schema = initialData ? updateAccountSchema : createAccountSchema;
    const validationData = initialData
      ? { name: form.name, email: form.email, isActive: form.isActive, permissionIds }
      : { ...form, permissionIds };
    const validation = schema.safeParse(validationData);

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        errors[path] = issue.message;
      });
      setFieldErrors(errors);
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(`field-${firstErrorField}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          const focusable = element.querySelector(
            "input, textarea, select",
          ) as HTMLElement | null;
          if (focusable) focusable.focus();
        }
      }
      return;
    }

    if (initialData?.id && !showSaveConfirm) {
      setShowSaveConfirm(true);
      return;
    }
    setShowSaveConfirm(false);

    setIsLoading(true);
    try {
      const canAssign = hasPermission("auth.permissions.all.assign");
      let saved: ManagementAccount;
      if (initialData?.id) {
        const payload: { name: string; email: string; isActive: boolean; password?: string } = {
          name: form.name,
          email: form.email,
          isActive: form.isActive,
        };
        if (form.password.trim()) {
          payload.password = form.password;
        }
        saved = await accountsApi.updateAccount(initialData.id, payload);
        if (canAssign) {
          saved = await accountsApi.assignPermissions(initialData.id, { permissionIds });
        }
      } else {
        saved = await accountsApi.createAccount({
          name: form.name,
          email: form.email,
          password: form.password,
        });
        if (canAssign && permissionIds.length > 0) {
          saved = await accountsApi.assignPermissions(saved.id, { permissionIds });
        }
      }
      setPopup({
        show: true,
        type: "success",
        message: initialData?.id
          ? "Cập nhật tài khoản thành công!"
          : "Tạo tài khoản thành công!",
      });
      onSave(saved);
    } catch (err) {
      const { field, message, isNetworkError } = extractApiError(err);
      if (field) {
        showFieldError(field, message, setFieldErrors);
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

  const grouped = useMemo(() => groupPermissions(permissions), [permissions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_11rem] gap-6 items-start">
      {/* Main form content */}
      <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-xl font-black"
            style={{ color: colors.primary.navy.DEFAULT }}
          >
            {initialData ? "Chỉnh sửa tài khoản" : "Tạo tài khoản mới"}
          </h2>
          <Button variant="ghost" isIconOnly size="sm" onClick={handleCancelRequest}>
            <X size={20} className="text-gray-500" />
          </Button>
        </div>

        {showNetworkError && <NetworkErrorPopup onRetry={() => window.location.reload()} />}

        {popup.show && (
          <PopupNotification
            type={popup.type}
            message={popup.message}
            onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
            autoClose
            autoCloseMs={1000}
          />
        )}

        <ConfirmDialog
          isOpen={showCancelConfirm}
          title="Bỏ thay đổi?"
          message="Bạn đã nhập thông tin. Nếu huỷ, những thay đổi này sẽ không được lưu."
          confirmLabel="Vẫn hủy"
          cancelLabel="Ở lại"
          onConfirm={handleConfirmCancel}
          onCancel={() => setShowCancelConfirm(false)}
        />

        <ConfirmDialog
          isOpen={showSaveConfirm}
          variant="warning"
          title="Lưu thay đổi"
          message={
            initialData
              ? "Bạn có chắc muốn lưu các thay đổi cho tài khoản này?"
              : "Bạn có chắc muốn tạo tài khoản mới?"
          }
          confirmLabel="Lưu"
          cancelLabel="Hủy"
          onConfirm={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
          onCancel={() => setShowSaveConfirm(false)}
        />

        <form id="account-form" onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Account info */}
            <div className="space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500">
                Thông tin tài khoản
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div id="field-name">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ tên <span style={{ color: colors.primary.DEFAULT }}>*</span>
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Nhập họ tên..."
                    className={`${inputBaseClass} ${fieldErrors.name ? errorInputClass : ""}`}
                  />
                  {fieldErrors.name && (
                    <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>
                  )}
                </div>

                <div id="field-email">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span style={{ color: colors.primary.DEFAULT }}>*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="email@era.com.vn"
                    className={`${inputBaseClass} ${fieldErrors.email ? errorInputClass : ""}`}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              {!initialData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div id="field-password">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mật khẩu <span style={{ color: colors.primary.DEFAULT }}>*</span>
                    </label>
                    <PasswordInput
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                      placeholder="Tối thiểu 6 ký tự"
                      className={`${inputBaseClass} ${fieldErrors.password ? errorInputClass : ""}`}
                    />
                    {fieldErrors.password && (
                      <p className="mt-1 text-xs text-red-500">{fieldErrors.password}</p>
                    )}
                  </div>

                  <div id="field-confirmPassword">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Xác nhận mật khẩu <span style={{ color: colors.primary.DEFAULT }}>*</span>
                    </label>
                    <PasswordInput
                      value={form.confirmPassword}
                      onChange={(e) => update("confirmPassword", e.target.value)}
                      placeholder="Nhập lại mật khẩu"
                      className={`${inputBaseClass} ${fieldErrors.confirmPassword ? errorInputClass : ""}`}
                    />
                    {fieldErrors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-500">{fieldErrors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <input
                  id="isActive"
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => update("isActive", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#C8102E] focus:ring-[#C8102E]"
                />
                <label
                  htmlFor="isActive"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Kích hoạt tài khoản
                </label>
              </div>
            </div>

            {hasPermission("auth.permissions.all.assign") && (
              <div className="space-y-5">
                <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500">
                  Phân quyền
                </h3>

                {permissions.length === 0 && (
                  <div className="flex items-center justify-center py-8 text-gray-400 text-sm">
                    Đang tải danh sách quyền...
                  </div>
                )}

                <div className="space-y-6">
                  {Object.entries(grouped).map(([module, resources]) => (
                    <div
                      key={module}
                      className="rounded-xl border border-gray-200 overflow-hidden"
                    >
                      <div
                        className="px-5 py-3 font-bold text-white text-sm"
                        style={{ backgroundColor: colors.primary.navy.DEFAULT }}
                      >
                        {moduleLabels[module] || module}
                      </div>
                      <div className="divide-y divide-gray-100">
                        {Object.entries(resources).map(([resource, perms]) =>
                          getResourceSections(module, resource, perms).map(({ key, label, perms: sectionPerms }) => {
                            const allSelected = sectionPerms.every((p) =>
                              selectedPermissionIds.has(p.id),
                            );
                            const someSelected =
                              sectionPerms.some((p) => selectedPermissionIds.has(p.id)) && !allSelected;
                            return (
                              <div key={key} className="p-5">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                                  <h4 className="font-semibold text-gray-800">
                                    {label}
                                  </h4>
                                  <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-600 cursor-pointer select-none">
                                    <input
                                      type="checkbox"
                                      checked={allSelected}
                                      ref={(el) => {
                                        if (el) el.indeterminate = someSelected;
                                      }}
                                      onChange={(e) =>
                                        toggleAll(
                                          sectionPerms.map((p) => p.id),
                                          e.target.checked,
                                        )
                                      }
                                      className="h-4 w-4 rounded border-gray-300 text-[#C8102E] focus:ring-[#C8102E]"
                                    />
                                    Chọn tất cả
                                  </label>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {sectionPerms.map((p) => {
                                    const label =
                                      p.scope === "all"
                                        ? `${actionLabels[p.action] || p.action}`
                                        : `${formatScope(p.scope)} - ${actionLabels[p.action] || p.action}`;
                                    const allPermForThisAction = sectionPerms.find(
                                      (x) => x.scope === "all" && x.action === p.action,
                                    );
                                    const isScopeDisabled =
                                      p.scope !== "all" &&
                                      allPermForThisAction &&
                                      selectedPermissionIds.has(allPermForThisAction.id);
                                    return (
                                      <label
                                        key={p.id}
                                        className={`flex items-start gap-2.5 rounded-lg border border-gray-100 bg-gray-50/50 p-3 transition-colors ${
                                          isScopeDisabled
                                            ? "opacity-50 cursor-not-allowed"
                                            : "cursor-pointer hover:bg-gray-50"
                                        }`}
                                        title={p.name}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={selectedPermissionIds.has(p.id)}
                                          onChange={() => togglePermission(p.id)}
                                          disabled={isScopeDisabled}
                                          className="h-4 w-4 mt-0.5 rounded border-gray-300 text-[#C8102E] focus:ring-[#C8102E]"
                                        />
                                        <span className="text-sm text-gray-700 leading-snug">
                                          {label}
                                        </span>
                                      </label>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile actions */}
            <div className="flex items-center justify-between gap-3 pt-4 md:hidden">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="px-6 bg-white"
                onClick={handleCancelRequest}
                disabled={isLoading}
              >
                Huỷ
              </Button>
              <button
                type="submit"
                disabled={isLoading || !isDirty}
                className="inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md px-6 py-2 text-sm bg-white border-2"
                style={{ borderColor: colors.primary.navy.DEFAULT, color: colors.primary.navy.DEFAULT }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary.navy.DEFAULT;
                  e.currentTarget.style.color = colors.neutral.white;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.neutral.white;
                  e.currentTarget.style.color = colors.primary.navy.DEFAULT;
                }}
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                {isLoading ? "Đang lưu..." : initialData ? "Lưu thay đổi" : "Lưu"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Sticky action sidebar — right */}
      <div className="hidden md:block sticky top-20 self-start">
        <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <button
            type="submit"
            form="account-form"
            disabled={isLoading || !isDirty}
            className="inline-flex items-center justify-center gap-2 w-full font-medium transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md px-4 py-2 text-sm bg-white border-2"
            style={{ borderColor: colors.primary.navy.DEFAULT, color: colors.primary.navy.DEFAULT }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary.navy.DEFAULT;
              e.currentTarget.style.color = colors.neutral.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.neutral.white;
              e.currentTarget.style.color = colors.primary.navy.DEFAULT;
            }}
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
            {isLoading ? "Đang lưu..." : initialData ? "Lưu thay đổi" : "Lưu"}
          </button>

          <div className="min-h-[160px]" />

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full justify-center bg-white"
            onClick={handleCancelRequest}
            disabled={isLoading}
          >
            Huỷ
          </Button>
        </div>
      </div>
    </div>
  );
}
