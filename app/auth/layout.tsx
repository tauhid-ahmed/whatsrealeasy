import Image from "next/image";
import authBackgroundImage from "@/assets/images/auth-background.svg";
import { getMe } from "@/lib/getServerAuth";
import { roleBasedPaths } from "@/paths";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: React.PropsWithChildren) {
  const me = await getMe();
  if (!me?.isActive)
    return (
      <div className="h-screen w-full flex items-center justify-center relative bg-[#05162b]">
        <div className="absolute hidden lg:flex items-center justify-center -translate-y-10 opacity-10">
          <Image
            src={authBackgroundImage}
            alt="Auth Background"
            className="object-cover"
          />
        </div>
        <div className="bg-gradient-to-br from-[#05162b]/50 via-transparent to-[#05162b]/50 absolute inset-0 hidden lg:block"></div>
        <div className="flex items-center justify-center z-20 size-full">
          {children}
        </div>
      </div>
    );
  return redirect(roleBasedPaths[me.role as keyof typeof roleBasedPaths]);
}
