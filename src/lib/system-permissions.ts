export const SUPER_ADMIN_PERMISSION = "system.super_admin";
export const ADMIN_PERMISSION = "system.admin";

const ADMIN_AUTH_VIEW_PERMISSIONS = new Set([
  "auth.accounts.all.view",
  "auth.permissions.all.view",
]);

function isAuthManagementPermission(permission: string): boolean {
  return (
    permission.startsWith("auth.accounts.") ||
    permission.startsWith("auth.permissions.")
  );
}

export function canAdminAccessPermission(permission: string): boolean {
  if (!isAuthManagementPermission(permission)) return true;
  return ADMIN_AUTH_VIEW_PERMISSIONS.has(permission);
}

export function hasSystemPermissionAccess(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  if (userPermissions.includes(SUPER_ADMIN_PERMISSION)) return true;

  if (userPermissions.includes(ADMIN_PERMISSION)) {
    return requiredPermissions.some(canAdminAccessPermission);
  }

  return false;
}

export function hasPermissionAccess(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  if (userPermissions.includes(SUPER_ADMIN_PERMISSION)) return true;

  if (userPermissions.includes(ADMIN_PERMISSION)) {
    return requiredPermissions.some(canAdminAccessPermission);
  }

  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission),
  );
}
