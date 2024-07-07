'use client'

import axios from "axios";
import { FormEvent, useState } from "react";


export default function Home() {

  const [files, setFiles] = useState<FileList | null>(null)

  function handleUploadFile(e: FormEvent){

    e.preventDefault()

    if(!files || files.length === 0 ) return


    const file = files[0]

    axios.post("https://uploadfile.52f55b1b02c68d8d1b57c71948eae40c.r2.cloudflarestorage.com/uploadfile/3d07d652-ed1b-4cf0-a82d-9294f62b5e57-snake1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=8bd04049b189fe354afe1fdbdcce03bc%2F20240707%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20240707T173332Z&X-Amz-Expires=600&X-Amz-Signature=4cf2babc91f5a40ca308cb00371189fa2c663425928c440be56531b7005f070e&X-Amz-SignedHeaders=host&x-id=GetObject", file, {
      headers: {
        'Content-Type': 'image/png'
      }
    })
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
