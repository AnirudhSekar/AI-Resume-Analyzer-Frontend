"use client";
import Navbar from "../app/components/Navbar";
import ResumeUpload from "../app/components/ResumeUpload";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">AI Resume Analyzer</h1>
        <ResumeUpload />
      </div>
    </div>
  );
}
