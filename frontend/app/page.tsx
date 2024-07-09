"use client"
import React, { useState } from "react";

const public_api = "https://uploadfiles-alpha.vercel.app/api";

export default function Home() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${public_api}/uploads`, {
          method: "POST",
          body: formData
        });

        if (response.ok) {
          alert("File uploaded successfully");
          setFileName(null);
          setFile(null);
        } else {
          alert("Failed to upload file");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file");
      }
    } else {
      alert("Please select a file");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleFormSubmit}>
        <input type="file" name="file" onChange={handleFileChange} />
        {fileName && <p>Selected file: <img src={fileName} alt="Uploaded Image" /></p>}
        <button type="submit" className="bg-black text-white rounded-lg ml-4 p-3">
          Submit
        </button>
      </form>
    </main>
  );
}
