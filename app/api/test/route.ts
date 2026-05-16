import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        secret: process.env.AUTH_SECRET,
        url: process.env.AUTH_URL,
    })
}
