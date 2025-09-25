import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginPath } from "@/paths";
import { env } from "@/env";
import { Me, MeResponse } from "@/types/auth.type";

export async function getMe(): Promise<Me | null> {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;

  try {
    const response = await fetch(`${env.API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: accessToken || "",
      },
    });

    if (!response.ok) return null;
    const responseData: MeResponse = await response.json();

    return {
      ...responseData.data,
      accessToken: accessToken || "",
    };
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<Me | null> {
  const data = await getMe();
  if (!data) {
    redirect(loginPath());
  }
  return data;
}

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value ?? null;
}
