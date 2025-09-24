import {
  DashboardHeader,
  DashboardLayout,
  DashboardSidebar,
  SidebarProvider,
} from "@/features/dashboard/layout";
import SidebarContent from "@/features/dashboard/layout/DashboardSidebarContent";
import { dashboardNavigation } from "@/data/dashboardNavbar";

export default function SuperAdminOutboundLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <SidebarProvider>
      <DashboardLayout
        header={<DashboardHeader />}
        sidebar={
          <DashboardSidebar>
            <SidebarContent
              mainItems={dashboardNavigation["super-admin"].main.outbound}
              subItems={dashboardNavigation["super-admin"].sub.outbound}
            />
          </DashboardSidebar>
        }
      >
        {children}
      </DashboardLayout>
    </SidebarProvider>
  );
}
