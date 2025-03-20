"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Page() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    acceptance_rate: "",
    grad_rate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchColleges = async () => {
    setLoading(true);
    setError(null);
    setColleges([]); // Clear previous results

    try {
      const response = await fetch("http://127.0.0.1:8000/college-matching/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          acceptance_rate: parseFloat(formData.acceptance_rate), // Convert to decimal
          grad_rate: parseInt(formData.grad_rate),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get backend error message
        throw new Error(errorData.detail || "Failed to fetch college matches.");
      }

      const data = await response.json();
      setColleges(data.best_fit_colleges);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md mt-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Find Your Best Fit Colleges</h2>

        {/* User Input Form */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold">Acceptance Rate (%)</label>
          <input
            type="number"
            name="acceptance_rate"
            value={formData.acceptance_rate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mt-1"
            placeholder="e.g., 40"
          />

          <label className="block text-gray-700 font-semibold mt-3">Graduation Rate (%)</label>
          <input
            type="number"
            name="grad_rate"
            value={formData.grad_rate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mt-1"
            placeholder="e.g., 60"
          />

          <button
            onClick={fetchColleges}
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded-md hover:bg-blue-700"
          >
            Find Colleges
          </button>
        </div>

        {/* Display Results */}
        {loading && <p className="text-gray-500">Finding best-fit colleges...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="mt-4">
          {colleges.length > 0 ? (
            <div className="space-y-3">
              {colleges.map((college, index) => (
                <div key={index} className="bg-gray-200 p-4 rounded-md font-semibold text-gray-800">
                  {college.College_Name}
                </div>
              ))}
            </div>
          ) : (
            !loading && <p className="text-gray-500">No matches found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
