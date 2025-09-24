// Auth paths
export const PREFIX_PATH = "/auth";
export const loginPath = () => `${PREFIX_PATH}/login`;
export const signupPath = () => `${PREFIX_PATH}/signup`;
export const forgotPasswordPath = () => `${PREFIX_PATH}/forgot-password`;
export const resetPasswordPath = () => `${PREFIX_PATH}/reset-password`;

// Admin dashboard paths
export const PREFIX_ADMIN_PATH = "/dashboard";
export const superAdminAnalyticsPath = () =>
  `${PREFIX_ADMIN_PATH}/super-admin/outbound/analytics`;
export const superAdminCallManagementPath = () =>
  `${PREFIX_ADMIN_PATH}/super-admin/outbound/call-management`;
export const superAdminNumberManagementPath = () =>
  `${PREFIX_ADMIN_PATH}/super-admin/outbound/number-management`;
export const superAdminCalenderPath = () =>
  `${PREFIX_ADMIN_PATH}/super-admin/outbound/calender`;
export const superAdminUserManagementPath = () =>
  `${PREFIX_ADMIN_PATH}/super-admin/outbound/user-management`;

export const roleBasedPaths = {
  super_admin: superAdminAnalyticsPath(),
};
