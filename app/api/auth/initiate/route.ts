import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/appointments/auth/initiate`);

    console.log("Fetch to backend initiated")
    const data = await res.json();

    console.log("Response from backend sdlk", data)
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
