import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { Media } from '@/types/api';

export interface UploadMediaResponse {
  id: string;
  url: string;
  folder: string;
}

export const mediaApi = {
  uploadImage: (file: File, folder?: 'news' | 'magazine' | 'general') => {
    const formData = new FormData();
    formData.append('file', file);

    return apiClient
      .post<UploadMediaResponse>(ENDPOINTS.MEDIA.UPLOAD, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        params: folder ? { folder } : undefined,
      })
      .then((res) => res.data);
  },

  uploadFile: (file: File, folder?: 'news' | 'magazine' | 'general') => {
    const formData = new FormData();
    formData.append('file', file);

    return apiClient
      .post<UploadMediaResponse>(ENDPOINTS.MEDIA.UPLOAD, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        params: folder ? { folder } : undefined,
      })
      .then((res) => res.data);
  },

  deleteMedia: (id: string) =>
    apiClient.delete<void>(ENDPOINTS.MEDIA.DELETE(id)).then((res) => res.data),

  getMediaList: (folder?: string) =>
    apiClient.get<Media[]>(ENDPOINTS.MEDIA.LIST, { params: folder ? { folder } : undefined }).then((res) => res.data),
};
