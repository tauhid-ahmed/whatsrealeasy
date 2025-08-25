import {
  DashboardHeader,
  DashboardLayout,
  DashboardSidebar,
  SidebarProvider,
} from "@/features/dashboard/layout";
import SidebarContent from "@/features/dashboard/layout/DashboardSidebarContent";
import { dashboardNavigation } from "@/data/dashboardNavbar";

export default async function AdminDashboardLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      <SidebarProvider>
        <DashboardLayout
          header={<DashboardHeader />}
          sidebar={
            <DashboardSidebar>
              <SidebarContent mainItems={dashboardNavigation.admin} />
            </DashboardSidebar>
          }
        >
          {children}
        </DashboardLayout>
      </SidebarProvider>
    </>
  );
}
