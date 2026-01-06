export default function AudiencePanel({ data }: any) {
return (
<div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100">
<h2 className="text-xl font-semibold text-gray-900 mb-2">Audience Insights</h2>
<p className="text-sm text-gray-500 mb-6">Regional response analysis</p>
<div className="space-y-4">
{data.map((a: any, idx: number) => (
<div
key={a.persona_id}
className="p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer border border-transparent hover:border-gray-200"
>
<div className="flex justify-between items-start mb-3">
<h3 className="font-semibold text-gray-900">{a.culture}</h3>
{a.risk && (
<span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-md font-medium">
Risk Detected
</span>
)}
</div>
<p className="text-gray-700 text-sm mb-2">{a.reaction}</p>
{a.risk && (
<div className="mt-3 p-3 bg-white rounded-md border-l-4 border-red-400">
<p className="text-sm text-red-700">{a.risk}</p>
</div>
)}
</div>
        ))}
</div>
</div>
  );
}
