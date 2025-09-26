import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { superAdminOutboundAnalyticsPath, loginPath } from "@/paths";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value ?? null;
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(token ? superAdminOutboundAnalyticsPath() : loginPath(), req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
