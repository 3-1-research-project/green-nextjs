import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get("session_token")?.value;
  const isAuthenticated = !!sessionToken;

  return NextResponse.json({ authenticated: isAuthenticated });
}
