import * as paths from "@/paths";

export const dashboardNavigation = {
  "super-admin": {
    main: {
      outbound: [
        {
          name: "Analytics",
          icon: "barChart",
          href: paths.superAdminAnalyticsPath(),
        },
        {
          name: "Calendar",
          icon: "calender",
          href: paths.superAdminCalenderPath(),
        },

        {
          name: "Number Management",
          icon: "number",
          href: paths.superAdminNumberManagementPath(),
        },
        {
          name: "Call Management",
          icon: "callManagement",
          href: paths.superAdminCallManagementPath(),
        },
      ],
      inbound: [
        {
          name: "Analytics",
          icon: "barChart",
          href: paths.superAdminAnalyticsPath(),
        },
        {
          name: "Calendar",
          icon: "calender",
          href: paths.superAdminCalenderPath(),
        },

        {
          name: "Number Management",
          icon: "number",
          href: paths.superAdminNumberManagementPath(),
        },
      ],
    },
    sub: {
      outbound: [
        {
          name: "Switch to inbound calls",
          icon: "userManagement",
          href: paths.superAdminUserManagementPath(),
        },
      ],
      inbound: [
        {
          name: "Switch to outbound calls",
          icon: "userManagement",
          href: paths.superAdminUserManagementPath(),
        },
      ],
    },
  },
};
