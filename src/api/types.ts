export interface ApiResponse<T> {
  status: string;
  data: T;
}

export interface ApiError {
  status: string;
  data: unknown;
}
