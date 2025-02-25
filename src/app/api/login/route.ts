import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getUserByUsername } from "@/lib/db/users";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username or password is empty" },
      { status: 400 }
    );
  }

  const user = await getUserByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.pw_hash))) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }

  const sessionToken = randomUUID();

  const response = NextResponse.json({ message: "Login successful", userId: user.id });
  response.cookies.set("session_token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 3600, // 1 hour
  });

  return response;
}
