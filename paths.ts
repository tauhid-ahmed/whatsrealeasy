// Auth paths
export const PREFIX_PATH = "/auth";
export const loginPath = () => `${PREFIX_PATH}/login`;
export const signupPath = () => `${PREFIX_PATH}/signup`;
export const forgotPasswordPath = () => `${PREFIX_PATH}/forgot-password`;
export const resetPasswordPath = () => `${PREFIX_PATH}/reset-password`;

// Admin dashboard paths
export const PREFIX_ADMIN_PATH = "/dashboard";
export const adminAnalyticsPath = () => `${PREFIX_ADMIN_PATH}/admin/analytics`;
export const adminCallManagementPath = () =>
  `${PREFIX_ADMIN_PATH}/admin/call-management`;
export const adminNumberManagementPath = () =>
  `${PREFIX_ADMIN_PATH}/admin/number-management`;
export const adminCalenderPath = () => `${PREFIX_ADMIN_PATH}/admin/calender`;
export const adminUserManagementPath = () =>
  `${PREFIX_ADMIN_PATH}/admin/user-management`;
