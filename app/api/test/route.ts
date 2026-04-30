import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        secret: process.env.NEXT_AUTH_SECRET,
        url: process.env.NEXT_AUTH_URL,
    })
}
