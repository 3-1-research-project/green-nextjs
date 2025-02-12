import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ followers: ["User1", "User2"] });
}

export async function POST(req: Request) {
  const body = await req.json();
  if (body.follow) {
    return NextResponse.json({ message: `Followed ${body.follow}` });
  }
  if (body.unfollow) {
    return NextResponse.json({ message: `Unfollowed ${body.unfollow}` });
  }
  return NextResponse.json({ message: "Invalid action" });
}
