import * as paths from "@/paths";

export const dashboardNavigation = {
  admin: [
    {
      name: "Analytics",
      icon: "barChart",
      href: paths.adminAnalyticsPath(),
    },
    {
      name: "Calendar",
      icon: "calender",
      href: paths.adminCalenderPath(),
    },

    {
      name: "Number Management",
      icon: "number",
      href: paths.adminNumberManagementPath(),
    },
    {
      name: "Call Management",
      icon: "callManagement",
      href: paths.adminCallManagementPath(),
    },
    {
      name: "All Users",
      icon: "users",
      href: paths.adminUserManagementPath(),
    },
  ],
  organization: [],
  agent: [],
};
