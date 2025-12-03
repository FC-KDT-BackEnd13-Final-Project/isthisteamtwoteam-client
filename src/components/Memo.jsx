export default function Memo() {
  return (
    <div className="overflow-hidden rounded-xl border border-amber-200 bg-amber-50">
      <div className="p-5">
        <textarea
          className="min-h-[300px] min-w-[400px] resize-none bg-transparent text-sm leading-relaxed text-slate-600 outline-none"
          placeholder="메모를 작성하세요..."
        />
      </div>
    </div>
  );
}
