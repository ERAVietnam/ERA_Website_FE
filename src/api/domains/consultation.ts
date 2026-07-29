import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';

export interface SubmitConsultationInput {
  name: string;
  phone: string;
  sourceUrl?: string;
  sourceLabel?: string;
}

export interface SubmitConsultationResponse {
  message: string;
}

export const consultationApi = {
  submit: (input: SubmitConsultationInput) =>
    apiClient
      .post<SubmitConsultationResponse>(ENDPOINTS.CONSULTATION.SUBMIT, input)
      .then((res) => res.data),
};
