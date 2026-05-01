// app/api/upload/route.ts
import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"
import { supabase } from "@/lib/supabaseClient"

export async function POST(req: Request) {
  try {
    const data = await req.formData()
    const file = data.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "pcom" },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    const uploadResult = result as {
  public_id: string
  secure_url: string
  version: number
  format: string
}
    const publicId = uploadResult.public_id;
    const version = uploadResult.version;
    const format = uploadResult.format;
    const secureUrl = uploadResult.secure_url;

    const path = `/v${version}/pcom/${publicId}.${format}`;

     // Adding the Cloudinary PID to Database
        const { d, error } = await supabase.from("artworks").insert({
            title: "Untitled",
            category: "Uncategorized",
        path: path,
    });
    if(error) {
        console.error("Error inserting into Supabase:", error);
        return NextResponse.json({ error: "Database insertion failed" }, { status: 500 });
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
