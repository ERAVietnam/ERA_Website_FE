export interface ExtractedApiError {
  field?: string;
  message: string;
  isNetworkError: boolean;
}

const STATUS_MESSAGES: Record<string, string> = {
  'fail.unauthorized': 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.',
  'fail.doNotHavePermission': 'Bạn không có quyền thực hiện thao tác này.',
  'fail.notFound': 'Không tìm thấy dữ liệu.',
  'fail.alreadyExists': 'Dữ liệu đã tồn tại.',
  'fail.invalidData': 'Dữ liệu không hợp lệ.',
  'fail.noFileProvided': 'Chưa chọn file.',
  'fail.fileTooLarge': 'File vượt quá kích thước cho phép.',
  'fail.invalidFileType': 'Định dạng file không được hỗ trợ.',
  'fail.invalidFolder': 'Thư mục upload không hợp lệ.',
  'error.internalServer': 'Lỗi hệ thống, vui lòng thử lại.',
  'error.storageUploadFailed': 'Tải file lên bộ nhớ thất bại, vui lòng thử lại.',
};

function isNetworkError(err: {
  status?: string;
  code?: string;
  message?: string;
  response?: { data?: unknown; status?: number } | null;
}): boolean {
  if (!err) return true;
  // BE error payload after axios interceptor (e.g. { status: 'fail.doNotHavePermission', data: {...} })
  if (typeof err.status === 'string') {
    if (err.status.startsWith('fail.') || err.status.startsWith('success')) return false;
    if (err.status.startsWith('error.') && err.status !== 'error.unknown') return false;
  }
  if (err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED') return true;
  if (typeof err.message === 'string' && err.message.toLowerCase().includes('network error')) return true;
  // Không có response => request không đến được server
  if (!err.response) return true;
  return false;
}

export function extractApiError(err: unknown): ExtractedApiError {
  const axiosError = err as {
    status?: string;
    data?: unknown;
    message?: string;
    response?: { data?: unknown; status?: number } | null;
    code?: string;
  };

  if (isNetworkError(axiosError)) {
    return {
      message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại.',
      isNetworkError: true,
    };
  }

  const data = axiosError.data ?? axiosError.response?.data;
  const payload = typeof data === 'object' && data !== null ? (data as Record<string, unknown>) : {};
  const status = (payload.status as string | undefined) ?? axiosError.status;

  // Field error: { status, data: { field, message } } hoặc { field, message }
  const nestedData = payload.data;

  let field: string | undefined;
  let rawMessage: unknown;

  if (nestedData && typeof nestedData === 'object' && 'field' in nestedData) {
    field = (nestedData as Record<string, unknown>).field as string;
    rawMessage = (nestedData as Record<string, unknown>).message;
  } else if ('field' in payload) {
    field = payload.field as string;
    rawMessage = payload.message;
  }

  if (field) {
    const message =
      typeof rawMessage === 'string' && rawMessage.trim()
        ? rawMessage
        : field === 'slug'
        ? 'Slug đã tồn tại ở bài đăng cũ, vui lòng đổi slug khác'
        : 'Dữ liệu không hợp lệ';
    return { field, message, isNetworkError: false };
  }

  // Message từ BE
  let message: string | undefined;

  if (typeof rawMessage === 'string' && rawMessage.trim()) {
    message = rawMessage;
  } else if (typeof payload.message === 'string' && payload.message.trim()) {
    message = payload.message;
  } else if (
    nestedData &&
    typeof nestedData === 'object' &&
    typeof (nestedData as Record<string, unknown>).message === 'string' &&
    ((nestedData as Record<string, unknown>).message as string).trim()
  ) {
    message = (nestedData as Record<string, unknown>).message as string;
  } else if (typeof data === 'string' && data.trim()) {
    message = data;
  } else if (Array.isArray(data) && data.length > 0) {
    message = data
      .map((m) => (typeof m === 'string' ? m : JSON.stringify(m)))
      .join('. ');
  } else if (nestedData) {
    if (typeof nestedData === 'string' && nestedData.trim()) {
      message = nestedData;
    } else if (
      Array.isArray(nestedData) &&
      nestedData.length > 0
    ) {
      message = nestedData
        .map((m) => (typeof m === 'string' ? m : JSON.stringify(m)))
        .join('. ');
    }
  }

  if (!message && status) {
    message = STATUS_MESSAGES[status] ?? 'Đã có lỗi xảy ra, vui lòng thử lại.';
  }

  if (!message) {
    message = 'Đã có lỗi xảy ra, vui lòng thử lại.';
  }

  return { message, isNetworkError: false };
}

export function showFieldError(
  field: string,
  message: string,
  setFieldErrors: (updater: (prev: Record<string, string>) => Record<string, string>) => void
) {
  setFieldErrors((prev) => ({ ...prev, [field]: message }));
  const element = document.getElementById(`field-${field}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const focusable = element.querySelector(
      'input, textarea, select, [contenteditable="true"]'
    ) as HTMLElement | null;
    if (focusable) focusable.focus();
  }
}
