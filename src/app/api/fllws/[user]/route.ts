import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { user: string } }
) {
  return NextResponse.json({ followers: [`Followers of ${params.user}`] });
}
