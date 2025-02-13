// app/api/get-username/route.js

import { getUserByUsername } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("id");

  if (!userId) {
    return new Response("User ID is required", { status: 400 });
  }

  try {
    const user = await getUserByUsername(userId);

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user.username), { status: 200 });
  } catch (error) {
    console.error("Error fetching username:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
