export default function Memo() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl overflow-hidden">
      <div className="p-5">
        <textarea
          className="min-w-[400px] bg-transparent resize-none min-h-[300px] text-sm text-slate-600 leading-relaxed outline-none"
          placeholder="메모를 작성하세요..."
        />
      </div>
    </div>
  );
}