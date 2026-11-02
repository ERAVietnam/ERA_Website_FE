"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, KeyRound, Loader2, RefreshCw, ShieldOff, X } from "lucide-react";
import { apiKeysApi } from "@/api/domains/apiKeys";
import { accountsApi } from "@/api/domains/accounts";
import { AdminDialog } from "@/components/ui/admin/AdminDialog";
import { Button } from "@/components/ui/Button";
import { extractApiError } from "@/lib/api-errors";
import type { ApiKey, ManagementAccount } from "@/types/api";

interface Props {
  account: ManagementAccount | null;
  isOpen: boolean;
  onClose: () => void;
}

const scopeLabels: Record<string, string> = {
  "news.articles.all.create": "Tin tức - tạo",
  "news.articles.all.update": "Tin tức - sửa/gửi duyệt",
  "projects.all.create": "Dự án - tạo",
  "projects.all.update": "Dự án - sửa/gửi duyệt",
};

function formatDate(value?: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(value));
}

export function ApiKeyManageDialog({ account, isOpen, onClose }: Props) {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [executionAccounts, setExecutionAccounts] = useState<ManagementAccount[]>([]);
  const [executionAccountId, setExecutionAccountId] = useState("");
  const [name, setName] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [secret, setSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const executionAccount = useMemo(
    () => executionAccounts.find((item) => item.id === executionAccountId) ?? null,
    [executionAccounts, executionAccountId],
  );

  const availableScopes = useMemo(
    () => Object.keys(scopeLabels).filter((scope) => executionAccount?.permissions.some((permission) => permission.code === scope)),
    [executionAccount],
  );

  const loadKeys = async () => {
    if (!account) return;
    setLoading(true);
    setError("");
    try {
      const allKeys = await apiKeysApi.getApiKeys();
      setKeys(allKeys.filter((key) => key.ownerEmail === account.email));
    } catch (err) {
      setError(extractApiError(err).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen || !account) return;
    // Reset dialog-local form state when a different account is selected.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(`${account.name} - AI Publisher`);
    setExecutionAccounts([]);
    setExecutionAccountId("");
    setSelectedScopes([]);
    setSecret(null);
    setCopied(false);
    void (async () => {
      try {
        const [accountsResponse, allKeys] = await Promise.all([
          accountsApi.getAccounts({ isActive: true, page: 1, limit: 100 }),
          apiKeysApi.getApiKeys(),
        ]);
        const activeAccounts = accountsResponse.items;
        const defaultExecutionAccount =
          activeAccounts.find((item) => item.email.toLowerCase() === "ai-publisher@era.com.vn") ??
          activeAccounts.find((item) => item.name.toLowerCase() === "era vietnam") ??
          activeAccounts.find((item) => item.id === account.id) ??
          activeAccounts[0];

        setExecutionAccounts(activeAccounts);
        setExecutionAccountId(defaultExecutionAccount?.id ?? "");
        setSelectedScopes(
          Object.keys(scopeLabels).filter((scope) =>
            defaultExecutionAccount?.permissions.some((permission) => permission.code === scope),
          ),
        );
        setKeys(allKeys.filter((key) => key.ownerEmail === account.email));
      } catch (err) {
        setError(extractApiError(err).message);
      }
    })();
    // The dialog intentionally initializes when opened for the selected account.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, account?.id]);

  const toggleScope = (scope: string) => {
    setSelectedScopes((current) =>
      current.includes(scope) ? current.filter((item) => item !== scope) : [...current, scope],
    );
  };

  const handleCreate = async () => {
    if (!account || !executionAccount || !name.trim() || selectedScopes.length === 0) {
      setError("Vui lòng nhập tên key và chọn ít nhất một quyền.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const created = await apiKeysApi.createApiKey({
        name: name.trim(),
        accountId: executionAccount.id,
        ownerName: account.name,
        ownerEmail: account.email,
        scopes: selectedScopes,
      });
      setSecret(created.apiKey);
      await loadKeys();
    } catch (err) {
      setError(extractApiError(err).message);
    } finally {
      setSaving(false);
    }
  };

  const handleRotate = async (id: string) => {
    if (!window.confirm("Rotate sẽ vô hiệu hóa key cũ và tạo secret mới. Tiếp tục?")) return;
    setSaving(true);
    setError("");
    try {
      const rotated = await apiKeysApi.rotateApiKey(id);
      setSecret(rotated.apiKey);
      await loadKeys();
    } catch (err) {
      setError(extractApiError(err).message);
    } finally {
      setSaving(false);
    }
  };

  const handleRevoke = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn thu hồi API key này?")) return;
    setSaving(true);
    setError("");
    try {
      await apiKeysApi.revokeApiKey(id);
      await loadKeys();
    } catch (err) {
      setError(extractApiError(err).message);
    } finally {
      setSaving(false);
    }
  };

  const copySecret = async () => {
    if (!secret) return;
    await navigator.clipboard.writeText(secret);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const handleExecutionAccountChange = (accountId: string) => {
    setExecutionAccountId(accountId);
    const nextAccount = executionAccounts.find((item) => item.id === accountId);
    setSelectedScopes(
      Object.keys(scopeLabels).filter((scope) =>
        nextAccount?.permissions.some((permission) => permission.code === scope),
      ),
    );
  };

  return (
    <AdminDialog isOpen={isOpen} onClose={onClose} maxWidth="max-w-3xl">
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">API key</h2>
          <p className="mt-1 text-sm text-gray-500">{account?.name} · {account?.email}</p>
        </div>
        <Button variant="ghost" isIconOnly size="sm" onClick={onClose} title="Đóng">
          <X size={18} />
        </Button>
      </div>

      <div className="max-h-[calc(100vh-10rem)] space-y-6 overflow-y-auto p-6">
        {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

        {secret && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-900">Lưu API key ngay — secret chỉ hiển thị lần này</p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <code className="min-w-0 flex-1 break-all rounded-lg bg-white px-3 py-2 text-xs text-gray-800">{secret}</code>
              <Button variant="outline" size="sm" className="gap-2 bg-white" onClick={copySecret}>
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? "Đã copy" : "Copy"}
              </Button>
            </div>
          </div>
        )}

        <section className="rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900">Tạo key mới</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Tài khoản thực thi / tác giả bài</label>
              <select
                value={executionAccountId}
                onChange={(event) => handleExecutionAccountChange(event.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-400"
              >
                <option value="">Chọn tài khoản thực thi</option>
                {executionAccounts.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} · {item.email}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">Bài viết sẽ được tạo bởi tài khoản này, không phải người được cấp key.</p>
            </div>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Tên key, ví dụ: Nguyen Van A - AI Publisher"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
            />
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">Phạm vi quyền của key</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {availableScopes.map((scope) => (
                  <label key={scope} className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700">
                    <input type="checkbox" checked={selectedScopes.includes(scope)} onChange={() => toggleScope(scope)} />
                    {scopeLabels[scope]}
                  </label>
                ))}
              </div>
              {availableScopes.length === 0 && <p className="text-sm text-red-600">Account này chưa có quyền tạo/sửa tin tức hoặc dự án.</p>}
            </div>
            <Button type="button" size="sm" className="gap-2" onClick={handleCreate} disabled={saving || availableScopes.length === 0}>
              {saving ? <Loader2 size={15} className="animate-spin" /> : <KeyRound size={15} />}
              Tạo API key
            </Button>
          </div>
        </section>

        <section>
          <h3 className="font-semibold text-gray-900">Key đã cấp</h3>
          {loading ? (
            <div className="flex items-center gap-2 py-6 text-sm text-gray-500"><Loader2 size={16} className="animate-spin" /> Đang tải...</div>
          ) : keys.length === 0 ? (
            <p className="py-6 text-sm text-gray-500">Chưa có API key nào.</p>
          ) : (
            <div className="mt-3 space-y-3">
              {keys.map((key) => (
                <div key={key.id} className="rounded-xl border border-gray-200 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900">{key.name}</p>
                      <p className="mt-1 font-mono text-xs text-gray-500">{key.keyPrefix}_••••••••</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {key.scopes.map((scope) => <span key={scope} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{scopeLabels[scope] || scope}</span>)}
                      </div>
                      <p className="mt-2 text-xs text-gray-500">Tạo ngày {formatDate(key.createdAt)} · Dùng lần cuối {formatDate(key.lastUsedAt)}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      {key.isActive ? (
                        <>
                          <span className="mr-2 rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-700">Đang hoạt động</span>
                          <Button variant="ghost" isIconOnly size="sm" title="Rotate" onClick={() => handleRotate(key.id)} disabled={saving}><RefreshCw size={15} className="text-amber-600" /></Button>
                          <Button variant="ghost" isIconOnly size="sm" title="Thu hồi" onClick={() => handleRevoke(key.id)} disabled={saving}><ShieldOff size={15} className="text-red-600" /></Button>
                        </>
                      ) : <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500">Đã thu hồi</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminDialog>
  );
}
