import { env } from "@/env";
import { logError } from "@/lib/logger";
import { LoginAPIResponse } from "@/types/auth.type";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const response = await fetch(`${env.API_BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      return NextResponse.json(
        {
          success: false,
          statusCode: response.status,
          message:
            errorBody?.message || "Forgot password failed. Please try again.",
        },
        { status: response.status }
      );
    }

    const responseBody: LoginAPIResponse = await response.json();
    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    logError(error);

    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message:
          error instanceof Error ? error.message : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
