const FILTERS = [
  { key: "all", label: "전체" },
  { key: "project", label: "프로젝트" },
  { key: "create", label: "생성" },
  { key: "update", label: "수정" },
  { key: "delete", label: "삭제" },
  { key: "approval", label: "승인" },
  { key: "status", label: "단계변경" },
  { key: "file", label: "파일" },
];

export default function HistoryFilter({ activeFilter = "all", onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {FILTERS.map((f) => {
        const isActive = activeFilter === f.key;
        return (
          <button
            key={f.key}
            type="button"
            onClick={() => onChange(f.key)}
            className={[
              "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition",
              isActive
                ? "border-indigo-400 bg-indigo-100 text-indigo-700"
                : "border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:bg-slate-50",
            ].join(" ")}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
