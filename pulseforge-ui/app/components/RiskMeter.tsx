import { motion } from "framer-motion";

// RiskMeter Component
export default function RiskMeter({ risk }: any) {
const getStatusColor = () => {
if (risk.status === "GREEN") return { bg: "bg-green-500", text: "text-green-700", light: "bg-green-50" };
if (risk.status === "YELLOW") return { bg: "bg-yellow-500", text: "text-yellow-700", light: "bg-yellow-50" };
return { bg: "bg-red-500", text: "text-red-700", light: "bg-red-50" };
  };
  
const colors = getStatusColor();

return (
<motion.div
initial={{ scale: 0.9, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
transition={{ duration: 0.4 }}
className="p-8 bg-white rounded-xl shadow-sm border border-gray-100"
>
<div className="flex justify-between items-start mb-6">
<div>
<h2 className="text-xl font-semibold text-gray-900">Safety Score</h2>
<p className="text-sm text-gray-500 mt-1">Content risk assessment</p>
</div>
<div className={`px-3 py-1 rounded-full text-xs font-medium ${colors.light} ${colors.text}`}>
{risk.status}
</div>
</div>
<div className="flex items-center gap-8">
<div className="relative">
<svg className="w-32 h-32 transform -rotate-90">
<circle
cx="64"
cy="64"
r="56"
stroke="#f3f4f6"
strokeWidth="12"
fill="none"
/>
<circle
cx="64"
cy="64"
r="56"
stroke="currentColor"
strokeWidth="12"
fill="none"
strokeDasharray={`${(risk.safety_score / 100) * 351.86} 351.86`}
className={colors.text}
strokeLinecap="round"
/>
</svg>
<div className="absolute inset-0 flex items-center justify-center">
<span className="text-3xl font-bold text-gray-900">{risk.safety_score}</span>
</div>
</div>
<div className="flex-1">
<div className="space-y-3">
<div>
<div className="flex justify-between text-sm mb-1">
<span className="text-gray-600">Cultural Sensitivity</span>
<span className="font-medium text-gray-900">
{risk.status === "GREEN" ? "High" : risk.status === "YELLOW" ? "Medium" : "Low"}
</span>
</div>
<div className="w-full bg-gray-100 rounded-full h-2">
<div 
className={`h-2 rounded-full ${colors.bg}`}
style={{ width: `${risk.safety_score}%` }}
/>
</div>
</div>
</div>
</div>
</div>
</motion.div>
  );
}