"use client"

import { useEffect, useState } from "react"

export default function Upload() {
    const [ imageId, setImageId ] = useState<string>("");
  const [file, setFile] = useState<File | null>(null)


  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    setImageId(data.path);
  }

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Upload</button>
      {imageId? <img src={`https://res.cloudinary.com/dk6xuayqj/image/upload/${imageId}`} alt="Uploaded Image" /> : <div>No image uploaded yet.</div>}
    </div>
  )
}
