"use client";
import { useState, useEffect } from "react";
import ResumeUpload from "../app/components/ResumeUpload";

export default function Home() {
  const [resumeFeedback, setResumeFeedback] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

  // ✅ Ensure rendering happens only on client-side
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; // Prevents SSR issues by rendering nothing initially
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">AI Resume Analyzer</h1>
      <ResumeUpload onUploadSuccess={(data) => setResumeFeedback(data.feedback.feedback)} />

      {resumeFeedback && (
        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg max-w-xl">
          <h2 className="text-lg font-bold">AI Resume Feedback:</h2>
          <div dangerouslySetInnerHTML={{ __html: resumeFeedback }}></div>
        </div>
      )}
    </div>
  );
}
