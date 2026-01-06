import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

export default function RiskChart({ data }: any) {
const CustomTooltip = ({ active, payload }: any) => {
if (active && payload && payload.length) {
return (
<div className="bg-gray-900 text-white p-3 rounded-lg shadow-xl text-sm">
<p className="opacity-75 mb-1">{payload[0].payload.time}</p>
<p className="font-semibold text-base">Score: {payload[0].value}</p>
</div>
      );
    }
return null;
  };

return (
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.5 }}
className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 mt-6"
>
<h2 className="text-xl font-semibold text-gray-900 mb-2">Performance History</h2>
<p className="text-sm text-gray-500 mb-6">Safety score over time</p>
<ResponsiveContainer width="100%" height={280}>
<LineChart data={data}>
<XAxis 
dataKey="time" 
stroke="#9ca3af" 
tick={{ fontSize: 12 }}
axisLine={{ stroke: '#e5e7eb' }}
          />
<YAxis 
domain={[0, 100]} 
stroke="#9ca3af"
tick={{ fontSize: 12 }}
axisLine={{ stroke: '#e5e7eb' }}
          />
<Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }} />
<Line 
type="monotone" 
dataKey="score" 
stroke="#4f46e5" 
strokeWidth={2.5}
dot={{ fill: '#4f46e5', r: 5, strokeWidth: 2, stroke: '#fff' }}
activeDot={{ r: 7, strokeWidth: 2 }}
          />
</LineChart>
</ResponsiveContainer>
</motion.div>
  );
}
