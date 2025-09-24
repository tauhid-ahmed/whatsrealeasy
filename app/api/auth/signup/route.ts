import { env } from "@/env";
import { logInfo } from "@/lib/logger";
import { SignUpAPIResponse } from "@/types/auth.type";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

type OrganizationSignupRequest = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  businessName: string;
  website?: string;
  address?: string;
  industry?: string;
};

function formatZodError(error: ZodError) {
  return error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
}

export async function POST(request: Request) {
  try {
    const formData: OrganizationSignupRequest = await request.json();

    const response = await fetch(`${env.API_BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          statusCode: response.status,
          message: "Signup failed. Please try again.",
        },
        { status: response.status }
      );
    }
    const responseBody = await response.json();

    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    if (error instanceof ZodError) {
      logInfo("40", error);
      return NextResponse.json(
        {
          success: false,
          statusCode: 400,
          message: "Validation failed. Please check your input.",
          errors: formatZodError(error),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
