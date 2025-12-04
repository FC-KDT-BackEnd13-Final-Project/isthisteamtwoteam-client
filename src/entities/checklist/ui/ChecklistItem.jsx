import Icon from "../../../shared/ui/Icon/Icon";

export default function ChecklistItem({
  item,
  onFileAdd,
  onFileRemove,
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 p-3 transition hover:bg-slate-50">
      <label className="flex items-start gap-3">
        <div className="flex-1 select-none">
          <span className="text-sm font-medium">{item.title}</span>
        </div>

        <label className="inline-flex cursor-pointer items-center gap-1 px-2 py-1 text-xs text-slate-500 hover:text-blue-600">
          <Icon name="paperclip" size={14} />
          <span>파일 첨부</span>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => onFileAdd(item.id, e.target.files)}
          />
        </label>
      </label>

      {item.files.length > 0 && (
        <div className="scrollbar-thin mt-2 ml-7 flex w-0 min-w-full gap-2 overflow-x-auto">
          {item.files.map((file, idx) => (
            <div
              key={idx}
              className="mb-3 flex shrink-0 items-center gap-1 rounded bg-slate-100 px-2 py-1 text-xs text-slate-600"
            >
              <Icon name="paper-clip" size={12} />
              <span className="max-w-[100px] truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => onFileRemove(item.id, idx)}
                className="ml-1 cursor-pointer text-red-400"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-2 ml-7"></div>
    </div>
  );
}
