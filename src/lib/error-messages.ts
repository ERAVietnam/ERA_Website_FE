export const ERROR_MESSAGES: Record<string, string> = {
  'fail.invalidData': 'Dữ liệu không hợp lệ.',
  'fail.notFound': 'Không tìm thấy dữ liệu.',
  'fail.alreadyExists': 'Dữ liệu đã tồn tại.',
  'fail.unauthorized': 'Vui lòng đăng nhập để tiếp tục.',
  'fail.doNotHavePermission': 'Bạn không có quyền thực hiện thao tác này.',
  'error.internalServer': 'Lỗi máy chủ. Vui lòng thử lại sau.',
  'error.unknown': 'Có lỗi xảy ra. Vui lòng thử lại.',
};

export const SUCCESS_MESSAGES: Record<string, string> = {
  'success.articleCreated': 'Tạo bài viết thành công!',
  'success.articleUpdated': 'Cập nhật bài viết thành công!',
  'success.articleDeleted': 'Xóa bài viết thành công!',
  default: 'Thao tác thành công!',
};

function getFieldLabel(field?: string): string {
  const labels: Record<string, string> = {
    slug: 'Slug',
    title: 'Tiêu đề',
    categoryId: 'Danh mục',
    featuredImageMediaId: 'Ảnh đại diện',
  };
  return labels[field || ''] || field || '';
}

function extractDataMessage(data?: unknown): string | null {
  if (typeof data === 'string' && data.trim()) {
    return data.trim();
  }

  if (Array.isArray(data)) {
    const messages = data
      .filter((item): item is string => typeof item === 'string')
      .map((item) => item.trim())
      .filter(Boolean);
    return messages.length > 0 ? messages.join(', ') : null;
  }

  if (
    data &&
    typeof data === 'object' &&
    'message' in data &&
    typeof (data as Record<string, unknown>).message === 'string'
  ) {
    const message = (data as Record<string, string>).message.trim();
    return message || null;
  }

  return null;
}

export function getErrorMessage(
  status?: string,
  data?: unknown,
  fallback?: string,
): string {
  if (!status) return fallback || ERROR_MESSAGES['error.unknown'];

  const dataMessage = extractDataMessage(data);
  if (dataMessage) return dataMessage;

  const baseMessage = ERROR_MESSAGES[status] || fallback || ERROR_MESSAGES['error.unknown'];
  const dataObj = (data || {}) as Record<string, any>;

  if (status === 'fail.alreadyExists' && dataObj.field) {
    return `${getFieldLabel(dataObj.field)} đã tồn tại.`;
  }

  if (status === 'fail.notFound' && dataObj.field) {
    return `${getFieldLabel(dataObj.field)} không tồn tại.`;
  }

  if (status === 'fail.invalidData' && dataObj.field) {
    if (dataObj.message) return dataObj.message;
    return `${getFieldLabel(dataObj.field)} không hợp lệ.`;
  }

  return baseMessage;
}

export function getSuccessMessage(status?: string): string {
  if (!status) return SUCCESS_MESSAGES.default;
  return SUCCESS_MESSAGES[status] || SUCCESS_MESSAGES.default;
}
