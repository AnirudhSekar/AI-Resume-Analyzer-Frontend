import { useState, useRef } from "react";

const ResumeUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setError(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("📤 Uploading file...");
      
      const response = await fetch("http://127.0.0.1:8000/upload-resume/", {
        method: "POST",
        body: formData,
      });

      console.log("✅ Response received:", response);

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("📄 AI Feedback:", data);

      onUploadSuccess(data);
    } catch (err) {
      console.error("❌ Upload error:", err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Your Resume</h2>

      {/* Hidden File Input */}
      <input type="file" accept=".pdf" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

      {/* Clickable Upload Area */}
      <div className="border-2 border-dashed p-6 text-center cursor-pointer hover:bg-gray-100" onClick={triggerFileInput}>
        {file ? <p className="text-green-600">{file.name} selected</p> : <p className="text-gray-500">Click to select a PDF file</p>}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button onClick={handleUpload} className="mt-3 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg w-full" disabled={uploading}>
        {uploading ? "Processing..." : "Upload Resume"}
      </button>
    </div>
  );
};

export default ResumeUpload;
