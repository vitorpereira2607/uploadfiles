'use client'

import axios from "axios";
import { FormEvent, useState } from "react";


export default function Home() {

  const [files, setFiles] = useState<FileList | null>(null)

  async function handleUploadFile(e: FormEvent){

    e.preventDefault()

    if(!files || files.length === 0 ) return

    const file = files[0]

    try{
      const { data } = await axios.post("http://localhost:3333/uploads", {
        name: file.name,
        contentType: file.type
      })

      console.log(data)

      const { signedUrl } = data

      await axios.put(signedUrl, file, {
        headers: {
          'Content-Type': file.type,
        }
      })

      alert("File upload successfully");


    }catch(error){
      console.error("Error uploading file:", error)
      alert("Failed to upload file")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <form onSubmit={handleUploadFile}>
      <input type="file" name="file" onChange={e => setFiles(e.target.files)}/> 
      <button type="submit" className="bg-black text-white rounded-lg ml-4 p-3">Submit</button>
     </form>
    </main>
  );
}
