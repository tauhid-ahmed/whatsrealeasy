import {
  DashboardHeader,
  DashboardLayout,
  DashboardSidebar,
  SidebarProvider,
} from "@/features/dashboard/layout";
import SidebarContent from "@/features/dashboard/layout/DashboardSidebarContent";
import { dashboardNavigation } from "@/data/dashboardNavbar";
import ScheduleProvider from "@/features/schedule/context/ScheduleContext";

export default function SuperAdminInBoundLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <ScheduleProvider>
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
          <div className="py-4">{children}</div>
        </DashboardLayout>
      </SidebarProvider>
    </ScheduleProvider>
  );
}
