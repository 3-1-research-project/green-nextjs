import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    messages: ["Public message 1", "Public message 2"],
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({
    message: "Message posted successfully",
    content: body.content,
  });
}
