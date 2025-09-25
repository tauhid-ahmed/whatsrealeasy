// Auth paths
export const PREFIX_PATH = "/auth";
export const loginPath = () => `${PREFIX_PATH}/login`;
export const signupPath = () => `${PREFIX_PATH}/signup`;
export const forgotPasswordPath = () => `${PREFIX_PATH}/forgot-password`;
export const resetPasswordPath = () => `${PREFIX_PATH}/reset-password`;

// Admin dashboard paths
export const PREFIX_ADMIN_PATH = "/dashboard";

// Outbound
export const superAdminOutboundAnalyticsPath = () =>
  `${PREFIX_ADMIN_PATH}/super-admin/outbound/analytics`;
export const superAdminOutboundCallLogsPath = () =>
  `${PREFIX_ADMIN_PATH}/super-admin/outbound/call-logs`;
export const superAdminOutboundNumberManagementPath = () =>
  `${PREFIX_ADMIN_PATH}/super-admin/outbound/number-management`;
export const superAdminOutboundCalenderPath = () =>
  `${PREFIX_ADMIN_PATH}/super-admin/outbound/calender`;

// Inbound
export const superAdminInboundAnalyticsPath = () =>
  `${PREFIX_ADMIN_PATH}/super-admin/inbound/analytics`;
export const superAdminInboundAgentManagementPath = () =>
  `${PREFIX_ADMIN_PATH}/super-admin/inbound/agent-management`;
export const superAdminInboundCallLogsPath = () =>
  `${PREFIX_ADMIN_PATH}/super-admin/inbound/call-logs`;
export const superAdminInboundCalenderPath = () =>
  `${PREFIX_ADMIN_PATH}/super-admin/inbound/calender`;

export const roleBasedPaths = {
  super_admin: superAdminOutboundAnalyticsPath(),
};
