const variantClass = {
  project: "bg-indigo-100 text-indigo-700 border-indigo-300",
  create: "bg-emerald-100 text-emerald-700 border-emerald-300",
  update: "bg-amber-100 text-amber-700 border-amber-300",
  delete: "bg-rose-100 text-rose-700 border-rose-300",
  approval: "bg-sky-100 text-sky-700 border-sky-300",
  status: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300",
  file: "bg-slate-100 text-slate-700 border-slate-300",
};

const labelMap = {
  project: "프로젝트",
  create: "생성",
  update: "수정",
  delete: "삭제",
  approval: "승인",
  status: "단계변경",
  file: "파일",
};

export default function Badge({ type }) {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium";
  const extra =
    variantClass[type] ?? "bg-slate-100 text-slate-700 border-slate-300";

  return <span className={`${base} ${extra}`}>{labelMap[type] ?? type}</span>;
}
