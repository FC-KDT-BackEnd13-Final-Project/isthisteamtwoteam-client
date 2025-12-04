import ChecklistItem from "../../../entities/checklist/ui/ChecklistItem";
import { useChecklistFiles } from "../../../features/checklist/attach-file/model/useChecklistFiles";

export default function ChecklistWidget({ initialItems }) {
  const { checkItems, handleFileAdd, handleFileRemove } =
    useChecklistFiles(initialItems);

  return (
    <div className="mt-3 flex flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
        <h4 className="text-sm font-semibold text-slate-900">체크리스트</h4>
      </div>
      <div className="space-y-2 overflow-y-auto p-3">
        {checkItems.map((item) => (
          <ChecklistItem
            key={item.id}
            item={item}
            onFileAdd={handleFileAdd}
            onFileRemove={handleFileRemove}
          />
        ))}
      </div>
    </div>
  );
}
