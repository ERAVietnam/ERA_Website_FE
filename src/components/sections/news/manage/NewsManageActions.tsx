"use client";

import { Button } from "@/components/ui/Button";
import {
  Send,
  CheckCircle,
  RotateCcw,
  XCircle,
  Eye,
  History,
  Pencil,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissionWarning } from "@/hooks/usePermissionWarning";
import {
  getNewsScopeBySlug,
  hasNewsArticlePermission,
} from "@/lib/permissions";
import type { NewsArticle } from "@/types/api";

interface NewsManageActionsProps {
  item: NewsArticle;
  currentAccountId?: string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onPreview?: (id: string) => void;
  onPublish?: (id: string) => void;
  onRevoke?: (id: string) => void;
  onSubmitForReview?: (id: string) => void;
  onReject?: (id: string) => void;
  onViewHistory?: (id: string) => void;
  layout?: "table" | "card";
  stopPropagation?: boolean;
}

export function NewsManageActions({
  item,
  currentAccountId,
  onView,
  onEdit,
  onDelete,
  onPreview,
  onPublish,
  onRevoke,
  onSubmitForReview,
  onReject,
  onViewHistory,
  layout = "table",
  stopPropagation = true,
}: NewsManageActionsProps) {
  const { hasPermission, account } = useAuth();
  const { guard } = usePermissionWarning();

  const currentId = currentAccountId ?? account?.id;
  const isSuperAdmin = hasPermission("system.super_admin");
  const isAuthor = currentId === item.authorId || isSuperAdmin;
  const scope = getNewsScopeBySlug(item.category.slug);

  const canPublish =
    isSuperAdmin ||
    hasPermission("news.articles.all.publish") ||
    (scope && hasPermission(`news.articles.${scope}.publish`));

  const canEditOrDelete =
    isSuperAdmin ||
    (item.status === "draft" && isAuthor) ||
    (item.status === "pending" && canPublish);

  const canSubmit = item.status === "draft" && isAuthor;
  const canReject = item.status === "pending" && canPublish;

  const canUpdate =
    canEditOrDelete && hasNewsArticlePermission(hasPermission, "update", scope);
  const canDelete =
    canEditOrDelete && hasNewsArticlePermission(hasPermission, "delete", scope);

  const handleClick = (cb?: () => void) => (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    cb?.();
  };

  if (layout === "card") {
    return (
      <div className="flex items-center gap-1.5">
        {canSubmit && onSubmitForReview && (
          <button
            onClick={handleClick(() => onSubmitForReview(item.id))}
            className="p-2 rounded-lg hover:bg-amber-50 transition-colors"
            title="Gửi duyệt"
          >
            <Send size={15} className="text-amber-600" />
          </button>
        )}
        {item.status === "pending" && canPublish && onPublish && (
          <button
            onClick={handleClick(() => onPublish(item.id))}
            className="p-2 rounded-lg hover:bg-green-50 transition-colors"
            title="Duyệt bài"
          >
            <CheckCircle size={15} className="text-green-600" />
          </button>
        )}
        {item.status === "published" && canPublish && onRevoke && (
          <button
            onClick={handleClick(() => onRevoke(item.id))}
            className="p-2 rounded-lg hover:bg-red-50 transition-colors"
            title="Hủy duyệt"
          >
            <RotateCcw size={15} className="text-red-500" />
          </button>
        )}
        {canReject && onReject && (
          <button
            onClick={handleClick(() => onReject(item.id))}
            className="p-2 rounded-lg hover:bg-red-50 transition-colors"
            title="Từ chối duyệt"
          >
            <XCircle size={15} className="text-red-500" />
          </button>
        )}
        {onPreview && (
          <button
            onClick={handleClick(() => onPreview(item.id))}
            className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
            title="Xem trước"
          >
            <Eye size={15} className="text-blue-600" />
          </button>
        )}
        {onViewHistory && (
          <button
            onClick={handleClick(() => onViewHistory(item.id))}
            className="p-2 rounded-lg hover:bg-purple-50 transition-colors"
            title="Lịch sử"
          >
            <History size={15} className="text-purple-600" />
          </button>
        )}
        {canUpdate && onEdit && (
          <button
            onClick={handleClick(() => onEdit(item.id))}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Chỉnh sửa"
          >
            <Pencil size={15} className="text-gray-500" />
          </button>
        )}
        {canDelete && onDelete && (
          <button
            onClick={handleClick(() =>
              guard(
                `news.articles.${scope ?? "all"}.delete`,
                () => onDelete(item.id),
                "Bạn không có quyền xóa bài viết.",
              ),
            )}
            className="p-2 rounded-lg hover:bg-red-50 transition-colors"
            title="Xoá"
          >
            <Trash2 size={15} className="text-red-500" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-1">
      {canSubmit && onSubmitForReview && (
        <Button
          variant="ghost"
          isIconOnly
          size="md"
          onClick={handleClick(() => onSubmitForReview(item.id))}
          title="Gửi duyệt"
          className="hover:!bg-amber-50"
        >
          <Send size={15} className="text-amber-600" />
        </Button>
      )}
      {item.status === "pending" && canPublish && onPublish && (
        <Button
          variant="ghost"
          isIconOnly
          size="md"
          onClick={handleClick(() => onPublish(item.id))}
          title="Duyệt bài"
          className="hover:!bg-green-50"
        >
          <CheckCircle size={15} className="text-green-600" />
        </Button>
      )}
      {item.status === "published" && canPublish && onRevoke && (
        <Button
          variant="ghost"
          isIconOnly
          size="md"
          onClick={handleClick(() => onRevoke(item.id))}
          title="Hủy duyệt"
          className="hover:!bg-red-50"
        >
          <RotateCcw size={15} className="text-red-500" />
        </Button>
      )}
      {canReject && onReject && (
        <Button
          variant="ghost"
          isIconOnly
          size="md"
          onClick={handleClick(() => onReject(item.id))}
          title="Từ chối duyệt"
          className="hover:!bg-red-50"
        >
          <XCircle size={15} className="text-red-500" />
        </Button>
      )}
      {onPreview && (
        <Button
          variant="ghost"
          isIconOnly
          size="md"
          onClick={handleClick(() => onPreview(item.id))}
          title="Xem trước"
          className="hover:!bg-blue-50"
        >
          <Eye size={15} className="text-blue-600" />
        </Button>
      )}
      {onViewHistory && (
        <Button
          variant="ghost"
          isIconOnly
          size="md"
          onClick={handleClick(() => onViewHistory(item.id))}
          title="Lịch sử"
          className="hover:!bg-purple-50"
        >
          <History size={15} className="text-purple-600" />
        </Button>
      )}
      {canUpdate && onEdit && (
        <Button
          variant="ghost"
          isIconOnly
          size="md"
          onClick={handleClick(() => onEdit(item.id))}
          title="Chỉnh sửa"
        >
          <Pencil size={15} className="text-gray-500" />
        </Button>
      )}
      {canDelete && onDelete && (
        <Button
          variant="ghost"
          isIconOnly
          size="md"
          onClick={handleClick(() =>
            guard(
              `news.articles.${scope ?? "all"}.delete`,
              () => onDelete(item.id),
              "Bạn không có quyền xóa bài viết.",
            ),
          )}
          title="Xoá"
          className="hover:!bg-red-50"
        >
          <Trash2 size={15} className="text-red-500" />
        </Button>
      )}
    </div>
  );
}
