"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";




export default function Home() {
const [content, setContent] = useState("");
const [result, setResult] = useState<any>(null);
const [loading, setLoading] = useState(false);
const [history, setHistory] = useState<any[]>([]);
const router = useRouter();

const analyze = async () => {
  setLoading(true);

  const res = await fetch("http://localhost:8000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  const data = await res.json();

  const reportId = uuidv4();

  const updatedHistory = [
    ...history,
    {
      time: new Date().toLocaleTimeString(),
      score: data.risk_assessment.safety_score,
    },
  ];

  // 🔐 Store per-report
  sessionStorage.setItem(
    `pulseforge_report_${reportId}`,
    JSON.stringify({
      result: data,
      history: updatedHistory,
    })
  );

  setLoading(false);

  // 🚀 Go to shareable link
  router.push(`/results/${reportId}`);
};

return (
<div className="min-h-screen bg-gray-50">
<motion.main
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="max-w-6xl mx-auto p-8"
>
<div className="mb-8">
<h1 className="text-4xl font-bold text-gray-900 mb-2">PulseForge</h1>
<p className="text-gray-600">Content Safety & Audience Analysis</p>
</div>

<div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
<label className="block text-sm font-medium text-gray-700 mb-2">
Your Content
</label>
<textarea
className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
rows={6}
placeholder="Paste your creative content here..."
value={content}
onChange={(e) => setContent(e.target.value)}
/>
<button
onClick={analyze}
disabled={loading || !content.trim()}
className="mt-4 w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
>
{loading ? (
<span className="flex items-center justify-center gap-2">
<svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
</svg>
Analyzing...
</span>
) : "Analyze Content"}
</button>
</div>
</motion.main>
</div>
  );
}