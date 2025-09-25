import { env } from "@/env";
import { logError } from "@/lib/logger";
import { NextResponse } from "next/server";

type ResetPasswordRequest = {
  newPassword: string;
  confirmPassword: string;
  token: string;
};

export async function POST(request: Request) {
  try {
    const body: ResetPasswordRequest = await request.json();

    const response = await fetch(`${env.API_BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const responseBody = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          statusCode: response.status,
          message:
            responseBody?.message || "Reset password failed. Please try again.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        statusCode: response.status,
        message: responseBody?.message || "Password reset successful.",
        data: responseBody?.data ?? null,
      },
      { status: response.status }
    );
  } catch (error) {
    logError(error);

    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message:
          error instanceof Error ? error.message : "Unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}
