import Image from "next/image";
import authBackgroundImage from "@/assets/images/auth-background.svg";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="h-screen w-full flex items-center justify-center relative bg-dark1">
      <div className="absolute hidden lg:flex items-center justify-center">
        <Image
          src={authBackgroundImage}
          alt="Auth Background"
          className="object-cover"
        />
      </div>
      <div className="bg-gradient-to-br from-dark3 via-dark3/50 to-dark3 absolute inset-0 hidden lg:block"></div>
      <div className="z-10 max-w-sm w-full shadow-2xl border border-gray-600 rounded overflow-hidden">
        {children}
      </div>
    </div>
  );
}
