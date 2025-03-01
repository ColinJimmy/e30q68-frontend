"use client"

import { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";

interface ApiResponse {
  answer: string;
  status: string;
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch("http://127.0.0.1:5000/querygov", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });
      const data: ApiResponse = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
    setLoading(false);
    setQuestion("");
  };

  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
      <Head>
        <title>Government Query Interface</title>
      </Head>
      <Header />
      <div className="container mx-auto p-6">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <label className="block mb-2 font-semibold">Enter your question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
            className="w-full p-2 border rounded mb-4 text-gray-900 dark:text-gray-100 dark:bg-gray-700"
          />
          <button 
            type="submit" 
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:bg-gray-500"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
        {loading && (
          <div className="mt-6 flex justify-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        )}
        {response && (
          <div className="mt-6 p-4 bg-gray-200 dark:bg-gray-700 rounded">
            <h2 className="font-semibold">Response:</h2>
            <div
                dangerouslySetInnerHTML={{
                    __html: response.answer
                    .replace(/\n/g, "<br />")
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
