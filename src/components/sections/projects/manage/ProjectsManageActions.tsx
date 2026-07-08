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
import type { Project } from "@/types/api";

interface ProjectsManageActionsProps {
  project: Project;
  currentAccountId?: string;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
  onPreview?: (project: Project) => void;
  onPublish?: (id: string) => void;
  onRevoke?: (id: string) => void;
  onSubmitForReview?: (id: string) => void;
  onReject?: (id: string) => void;
  onViewHistory?: (id: string) => void;
  layout?: "table" | "card";
  stopPropagation?: boolean;
}

export function ProjectsManageActions({
  project,
  currentAccountId,
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
}: ProjectsManageActionsProps) {
  const { hasPermission, account } = useAuth();
  const { guard } = usePermissionWarning();

  const currentId = currentAccountId ?? account?.id;
  const isSuperAdmin = hasPermission("system.super_admin");
  const isAuthor = currentId === project.createdBy?.id || isSuperAdmin;

  const canView = hasPermission("projects.all.view");
  const canPublish =
    isSuperAdmin || hasPermission("projects.all.publish");

  const canEditOrDelete =
    isSuperAdmin ||
    (project.publicationStatus === "draft" && isAuthor) ||
    (project.publicationStatus === "pending" && canPublish);

  const canUpdate =
    canEditOrDelete && hasPermission("projects.all.update");
  const canDelete =
    canEditOrDelete && hasPermission("projects.all.delete");

  const canSubmit =
    project.publicationStatus === "draft" && isAuthor && hasPermission("projects.all.update");
  const canReject =
    project.publicationStatus === "pending" && canPublish;

  const handleClick = (cb?: () => void) => (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    cb?.();
  };

  const renderButton = (
    onClick: () => void,
    title: string,
    icon: React.ReactNode,
    hoverClass: string,
    key: string
  ) => (
    <Button
      key={key}
      variant="ghost"
      isIconOnly
      size="md"
      onClick={handleClick(onClick)}
      title={title}
      className={hoverClass}
    >
      {icon}
    </Button>
  );

  const buttons = [
    canSubmit && onSubmitForReview
      ? renderButton(
          () => onSubmitForReview(project.id),
          "Gửi duyệt",
          <Send size={15} className="text-amber-600" />,
          "hover:!bg-amber-50",
          "submit"
        )
      : null,
    project.publicationStatus === "pending" && canPublish && onPublish
      ? renderButton(
          () => onPublish(project.id),
          "Duyệt dự án",
          <CheckCircle size={15} className="text-green-600" />,
          "hover:!bg-green-50",
          "publish"
        )
      : null,
    project.publicationStatus === "published" && canPublish && onRevoke
      ? renderButton(
          () => onRevoke(project.id),
          "Hủy duyệt",
          <RotateCcw size={15} className="text-red-500" />,
          "hover:!bg-red-50",
          "revoke"
        )
      : null,
    canReject && onReject
      ? renderButton(
          () => onReject(project.id),
          "Từ chối duyệt",
          <XCircle size={15} className="text-red-500" />,
          "hover:!bg-red-50",
          "reject"
        )
      : null,
    canView && onPreview
      ? renderButton(
          () => onPreview(project),
          "Xem trước",
          <Eye size={15} className="text-blue-600" />,
          "hover:!bg-blue-50",
          "preview"
        )
      : null,
    canView && onViewHistory
      ? renderButton(
          () => onViewHistory(project.id),
          "Lịch sử",
          <History size={15} className="text-purple-600" />,
          "hover:!bg-purple-50",
          "history"
        )
      : null,
    canUpdate && onEdit
      ? renderButton(
          () => onEdit(project),
          "Chỉnh sửa",
          <Pencil size={15} className="text-gray-500" />,
          "hover:!bg-gray-100",
          "edit"
        )
      : null,
    canDelete && onDelete
      ? renderButton(
          () =>
            guard(
              "projects.all.delete",
              () => onDelete(project.id),
              "Bạn không có quyền xóa dự án."
            ),
          "Xoá",
          <Trash2 size={15} className="text-red-500" />,
          "hover:!bg-red-50",
          "delete"
        )
      : null,
  ].filter(Boolean);

  if (layout === "card") {
    return (
      <div className="flex w-full flex-wrap items-center justify-end gap-1.5">
        {buttons.map((btn) => btn)}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-1 flex-nowrap">
      {buttons.map((btn) => btn)}
    </div>
  );
}
