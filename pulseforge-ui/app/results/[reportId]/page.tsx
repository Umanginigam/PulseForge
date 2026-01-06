"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import RiskMeter from "../../components/RiskMeter";
import AudiencePanel from "../../components/AudiencePanel";
import RewritePanel from "../../components/RewritePanel";
import RiskChart from "../../components/RiskChart";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


export default function ResultsPage() {
  const { reportId } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(`pulseforge_report_${reportId}`);

    if (!stored) {
      router.push("/");
      return;
    }

    setData(JSON.parse(stored));
  }, [reportId, router]);

  if (!data) return null;

  const downloadPDF = async () => {
  const element = document.getElementById("report-content");
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("pulseforge-report.pdf");
};


  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">PulseForge Report</h1>

        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          Copy Share Link
        </button>
        <button
  onClick={downloadPDF}
  className="text-sm bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
>
  Download PDF
</button>

      </div>

      <div className="space-y-5">
        <RiskMeter risk={data.result.risk_assessment} />
        <AudiencePanel data={data.result.audience_reactions} />
        <RewritePanel data={data.result.rewrite_suggestions} />
        <RiskChart data={data.history} />
      </div>
    </motion.main>
  );
}
