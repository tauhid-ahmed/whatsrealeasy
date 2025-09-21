import Image from "next/image";
import authBackgroundImage from "@/assets/images/auth-background.svg";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="h-screen w-full flex items-center justify-center relative bg-dark3">
      <div className="absolute hidden lg:flex items-center justify-center -translate-y-10">
        <Image
          src={authBackgroundImage}
          alt="Auth Background"
          className="object-cover"
        />
      </div>
      <div className="bg-gradient-to-br from-dark3 via-dark3/30 to-dark3 absolute inset-0 hidden lg:block"></div>
      <div className="flex items-center justify-center z-20 size-full">
        {children}
      </div>
    </div>
  );
}
