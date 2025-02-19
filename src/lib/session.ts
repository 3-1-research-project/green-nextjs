import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { User } from "@/types/user.type";
import { cache } from "react";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: { user: User; expiresAt: Date }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as { user: User; expiresAt: Date };
  } catch (error) {
    console.log("Failed to verify session: ", error);
  }
}

export async function createSession(user: User) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ user, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) {
    return { isAuth: false };
  }

  const session = await decrypt(cookie);

  if (!session?.user) {
    return { isAuth: false };
  }

  return { isAuth: true, user: session.user };
});
