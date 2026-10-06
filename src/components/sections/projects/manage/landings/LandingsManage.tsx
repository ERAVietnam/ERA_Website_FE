"use client";

import { useCallback, useEffect, useState } from "react";
import { landingsApi } from "@/api/domains/landings";
import { usePopupNotification } from "@/hooks/usePopupNotification";
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";
import { LandingsManageList } from "./LandingsManageList";
import { LandingsManageForm, type LandingFormData } from "./LandingsManageForm";
import type { Landing } from "@/types/api";

export function apiLandingToFormData(landing: Landing): LandingFormData {
  return {
    id: landing.id,
    title: landing.title,
    location: landing.location,
    tags: landing.tags ?? [],
    url: landing.url,
    imageMediaId: landing.imageMediaId ?? null,
    imageMedia: landing.imageMedia ?? null,
  };
}

interface LandingsManageProps {
  onBack: () => void;
}

/** Quản lý landing — 1 key quyền duy nhất: projects.all.landing */
export function LandingsManage({ onBack }: LandingsManageProps) {
  const [landings, setLandings] = useState<Landing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<LandingFormData | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { popup, showSuccess, showError, closePopup } = usePopupNotification();
  const { showNetworkError, setShowNetworkError, handleApiError } = useApiErrorHandler(showError);

  const fetchLandings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await landingsApi.getLandings();
      setLandings(data);
    } catch {
      setShowNetworkError(true);
    } finally {
      setLoading(false);
    }
  }, [setShowNetworkError]);

  useEffect(() => {
    fetchLandings();
  }, [fetchLandings]);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (landing: Landing) => {
    setEditing(apiLandingToFormData(landing));
    setShowForm(true);
  };

  const handleSave = async (data: LandingFormData) => {
    setSaving(true);
    try {
      const payload = {
        title: data.title,
        location: data.location,
        tags: data.tags.filter((t) => t.trim()),
        url: data.url,
        imageMediaId: data.imageMediaId ?? null,
      };
      if (data.id) {
        await landingsApi.updateLanding(data.id, payload);
        showSuccess("Cập nhật landing thành công!");
      } else {
        await landingsApi.createLanding(payload);
        showSuccess("Tạo landing thành công!");
      }
      setShowForm(false);
      setEditing(null);
      fetchLandings();
    } catch (err) {
      handleApiError(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await landingsApi.deleteLanding(deletingId);
      showSuccess("Xóa landing thành công!");
      setDeletingId(null);
      fetchLandings();
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <>
      {showForm ? (
        <LandingsManageForm
          initialData={editing}
          saving={saving}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      ) : (
        <LandingsManageList
          landings={landings}
          loading={loading}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={(id) => setDeletingId(id)}
          onBack={onBack}
        />
      )}

      <ConfirmDialog
        isOpen={!!deletingId}
        onCancel={() => setDeletingId(null)}
        onConfirm={handleDelete}
        title="Xóa landing"
        message="Bạn có chắc chắn muốn xóa landing này? Hành động này không thể hoàn tác."
        confirmLabel="Xóa"
        cancelLabel="Hủy"
        variant="danger"
      />

      {popup.show && (
        <PopupNotification
          type={popup.type}
          message={popup.message}
          onClose={closePopup}
          autoClose
        />
      )}
      {showNetworkError && <NetworkErrorPopup onRetry={fetchLandings} />}
    </>
  );
}
