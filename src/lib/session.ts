import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cache } from "react";
import { getUserById } from "./db/users";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

async function encrypt(userId: string, expiresAt: Date) {
  return new SignJWT({userId})
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(encodedKey);
}

async function decrypt(session?: string) {
  if (!session) return null;
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as { userId: string };
  } catch (error) {
    console.error("Session verification failed:", error);
    return null;
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt(userId, expiresAt);

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function destroySession() {
  (await cookies()).delete("session");
}

export const verifySession = cache(async () => {
  const sessionCookie = (await cookies()).get("session")?.value;
  if (!sessionCookie) return { isAuth: false };

  try {
    const session = await decrypt(sessionCookie);
    if (!session) return { isAuth: false };
    
    const user = await getUserById(session.userId);
    if (!user) return { isAuth: false };

    return { isAuth: true, user };
  } catch (error) {
    console.error("Error verifying session:", error);
    return { isAuth: false };
  }
});
