import { env } from "@/env";
import { logError } from "@/utils/logger";
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

    const responseBody = await response.json();

    return NextResponse.json(responseBody, { status: response.status });
  } catch (error) {
    if (error instanceof ZodError) {
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

    logError(error);

    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
