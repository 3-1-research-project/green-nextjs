import { showUsers } from "@/lib/db";

export async function GET() {

  try {
    const users = await showUsers();

    if (!users) {
      return new Response("No users found", { status: 404 });
    }

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching username:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
