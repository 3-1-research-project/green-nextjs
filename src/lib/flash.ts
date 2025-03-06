"use server";

import { cookies } from "next/headers";

const FLASH_COOKIE_NAME = "flash_messages";

export async function setFlashMessage(message: string) {
    const cookieStore = await cookies();
    const existingMessages = JSON.parse(cookieStore.get(FLASH_COOKIE_NAME)?.value || "[]");

    existingMessages.push(message);

    cookieStore.set(FLASH_COOKIE_NAME, JSON.stringify(existingMessages), {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
    });
}

export async function getFlashMessages(): Promise<string[]> {
    const cookieStore = await cookies();
    const messages = JSON.parse(cookieStore.get(FLASH_COOKIE_NAME)?.value || "[]");

    return messages;
}

export async function clearFlashMessages() {
    (await cookies()).delete(FLASH_COOKIE_NAME);
  }
