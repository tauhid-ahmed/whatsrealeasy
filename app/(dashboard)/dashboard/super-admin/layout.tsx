import { getMe } from "@/lib/getServerAuth";
import { loginPath } from "@/paths";
import { redirect } from "next/navigation";

export default async function AdminDashboardLayout({
  children,
}: React.PropsWithChildren) {
  const me = await getMe();
  if (!me || !me?.isActive) return redirect(loginPath());
  return children;
}
