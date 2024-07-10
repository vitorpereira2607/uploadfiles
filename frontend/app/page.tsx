'use client'
import React, { ChangeEvent, useState } from "react";
import axios from "axios";

interface UploadResponse {
  file: string;
  signedUrl: string;
}


const public_api = process.env.PUBLIC_API_URL || '';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSucces, setUploadSucess] = useState<string | null>(null);


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const { name, type } = file;

      const response = await axios.post<UploadResponse>(`${public_api}/uploads`, {
        name,
        contentType: type
      });

      const { signedUrl } = response.data;

      await axios.put(signedUrl, file, {
        headers: {
          'Content-Type': type
        }
      });

      setUploadSucess('File uploaded successfully. 🔥')

    } catch (error) {
      setUploadError('File upload failed. Please try again later.');
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
      <input type="file" onChange={handleFileChange} />
      <button className="bg-black text-white rounded-lg ml-4 p-3" onClick={handleUpload} disabled={uploading}>
        Upload
      </button>
      {uploading && <p>Uploading...</p>}
      {uploadSucces && <p>{uploadSucces}</p>}
      {uploadError && <p>{uploadError}</p>}
      </div>
     
    </main>
  );
}
