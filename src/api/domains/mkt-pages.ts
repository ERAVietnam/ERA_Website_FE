import { apiClient } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type { MktPage } from "@/types/api";

export interface MktPageUploadMetadata {
  operation: "create" | "update";
  slug: string;
  title: string;
  description?: string;
  indexable: boolean;
  ogImage?: string | null;
  tagManagerId?: string | null;
  metaPixelId?: string | null;
  form?: Record<string, unknown> | null;
}

export const mktPagesApi = {
  list: () => apiClient.get<MktPage[]>(ENDPOINTS.MKT_PAGES.LIST).then((res) => res.data),
  remove: (slug: string) => apiClient.delete(ENDPOINTS.MKT_PAGES.DELETE(slug)).then((res) => res.data),
  upload: (file: File, metadata: MktPageUploadMetadata) => {
    const body = new FormData();
    body.append("file", file);
    body.append("metadata", JSON.stringify(metadata));
    return apiClient
      .post<MktPage>(ENDPOINTS.MKT_PAGES.CREATE, body, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data);
  },
};
