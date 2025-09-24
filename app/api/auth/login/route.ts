import { env } from "@/env";
import { logError } from "@/lib/logger";
import { LoginAPIResponse } from "@/types/auth.type";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const response = await fetch(`${env.API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const loginResponse: LoginAPIResponse = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: loginResponse.message },
        { status: response.status }
      );
    }

    const {
      success,
      message,
      data: { accessToken, refreshToken },
    } = loginResponse;

    const accessTokenPayload = accessToken
      ? JSON.parse(atob(accessToken.split(".")[1]))
      : null;

    const refreshTokenPayload = refreshToken
      ? JSON.parse(atob(refreshToken.split(".")[1]))
      : null;

    const nextResponse = NextResponse.json(
      {
        success,
        message,
        data: {
          ...accessTokenPayload,
        },
      },
      { status: 200 }
    );

    if (accessToken && accessTokenPayload) {
      nextResponse.cookies.set("accessToken", accessToken, {
        httpOnly: env.NODE_ENV === "production",
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: accessTokenPayload.exp,
        path: "/",
      });
    }

    if (refreshToken && accessTokenPayload) {
      nextResponse.cookies.set("refreshToken", refreshToken, {
        httpOnly: env.NODE_ENV === "production",
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: refreshTokenPayload.exp,
        path: "/",
      });
    }

    return nextResponse;
  } catch (error) {
    logError(error);

    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
