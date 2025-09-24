import {
  DashboardHeader,
  DashboardLayout,
  DashboardSidebar,
  SidebarProvider,
} from "@/features/dashboard/layout";
import SidebarContent from "@/features/dashboard/layout/DashboardSidebarContent";
import { dashboardNavigation } from "@/data/dashboardNavbar";

export default function SuperAdminInBoundLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <SidebarProvider>
      <DashboardLayout
        header={<DashboardHeader />}
        sidebar={
          <DashboardSidebar>
            <SidebarContent
              mainItems={dashboardNavigation["super-admin"].main.inbound}
              subItems={dashboardNavigation["super-admin"].sub.inbound}
            />
          </DashboardSidebar>
        }
      >
        {children}
      </DashboardLayout>
    </SidebarProvider>
  );
}
