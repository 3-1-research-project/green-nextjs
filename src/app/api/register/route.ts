import { NextResponse } from "next/server";
import { getUserByUsername, createUser } from "@/lib/db/users";
import bcrypt from "bcrypt";


export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username or password is empty" },
      { status: 400 }
    );
  }

  // Check if the username already exists
  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    return NextResponse.json(
      { error: "Username already exists" },
      { status: 409 }
    );
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUserId = await createUser(username, email, hashedPassword);

  return NextResponse.json({
    message: "User registered successfully",
    userId: newUserId,
  });
}
