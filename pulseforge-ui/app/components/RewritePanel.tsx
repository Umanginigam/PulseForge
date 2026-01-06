export default function RewritePanel({ data }: any) {
return (
<div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100">
<h2 className="text-xl font-semibold text-gray-900 mb-2">Suggestions</h2>
<p className="text-sm text-gray-500 mb-6">Recommended improvements</p>
{data.suggestions.length === 0 ? (
<div className="text-center py-8">
<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
</svg>
</div>
<p className="text-gray-900 font-medium">Content looks great!</p>
<p className="text-gray-500 text-sm mt-1">No revisions needed</p>
</div>
      ) : (
<div className="space-y-5">
{data.suggestions.map((s: any, idx: number) => (
<div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
<div className="bg-amber-50 px-5 py-3 border-b border-amber-100">
<p className="font-medium text-gray-900">{s.issue}</p>
</div>
<div className="p-5 space-y-3">
{s.alternatives.map((alt: string, i: number) => (
<div key={i} className="flex gap-3 group">
<div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-medium">
{i + 1}
</div>
<p className="text-gray-700 text-sm leading-relaxed flex-1">{alt}</p>
</div>
                ))}
</div>
</div>
          ))}
</div>
      )}
</div>
  );
}