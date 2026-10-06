import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import type {
  CreateLandingInput,
  Landing,
  UpdateLandingInput,
} from "@/types/api";

/** API landings — tách riêng hoàn toàn khỏi API dự án */
export const landingsApi = {
  /** Public: danh sách landing hiển thị ở trang /du-an */
  getLandings: () =>
    apiClient
      .get<Landing[]>(ENDPOINTS.LANDINGS.LIST)
      .then((res) => res.data),

  getLandingById: (id: string) =>
    apiClient
      .get<Landing>(ENDPOINTS.LANDINGS.DETAIL(id))
      .then((res) => res.data),

  createLanding: (data: CreateLandingInput) =>
    apiClient
      .post<Landing>(ENDPOINTS.LANDINGS.CREATE, data)
      .then((res) => res.data),

  updateLanding: (id: string, data: UpdateLandingInput) =>
    apiClient
      .patch<Landing>(ENDPOINTS.LANDINGS.UPDATE(id), data)
      .then((res) => res.data),

  deleteLanding: (id: string) =>
    apiClient
      .delete<{ id: string }>(ENDPOINTS.LANDINGS.DELETE(id))
      .then((res) => res.data),
};
