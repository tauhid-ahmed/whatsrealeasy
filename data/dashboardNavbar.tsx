import * as paths from "@/paths";

export const dashboardNavigation = {
  "super-admin": {
    main: {
      outbound: [
        {
          name: "Analytics",
          icon: "barChart",
          href: paths.superAdminOutboundAnalyticsPath(),
        },

        {
          name: "Number Management",
          icon: "number",
          href: paths.superAdminOutboundNumberManagementPath(),
        },
        {
          name: "Call Logs",
          icon: "callManagement",
          href: paths.superAdminOutboundCallLogsPath(),
        },
        {
          name: "Calendar",
          icon: "calender",
          href: paths.superAdminOutboundCalenderPath(),
        },
      ],
      inbound: [
        {
          name: "Analytics",
          icon: "barChart",
          href: paths.superAdminInboundAnalyticsPath(),
        },
        {
          name: "Agent Management",
          icon: "barChart",
          href: paths.superAdminInboundAgentManagementPath(),
        },
        {
          name: "Call Logs",
          icon: "number",
          href: paths.superAdminInboundCallLogsPath(),
        },
        {
          name: "Calendar",
          icon: "calender",
          href: paths.superAdminInboundCalenderPath(),
        },
      ],
    },
    sub: {
      outbound: [
        // {
        //   name: "Switch to inbound calls",
        //   icon: "userManagement",
        //   href: paths.superAdminInboundAnalyticsPath(),
        // },
      ],
      inbound: [
        // {
        //   name: "Switch to outbound calls",
        //   icon: "userManagement",
        //   href: paths.superAdminOutboundAnalyticsPath(),
        // },
      ],
    },
  },
};
