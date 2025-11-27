import { useState } from "react";
import Icon from "../global/components/Icon";

export default function CheckList() {
  const [checkItems, setCheckItems] = useState([
    { id: 1, title: "내용1", files: [] },
    { id: 2, title: "내용2", files: [] },
    { id: 3, title: "내용3", files: [] },
  ]);

  // 파일 추가 함수
  const handleFileAdd = (id, newFiles) => {
    setCheckItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, files: [...item.files, ...Array.from(newFiles)] }
          : item
      )
    );
  };

  // 파일 삭제 함수
  const handleFileRemove = (itemId, fileIndex) => {
    setCheckItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, files: item.files.filter((_, idx) => idx !== fileIndex) }
          : item
      )
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-xl mt-3 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
        <h4 className="text-sm font-semibold text-slate-900">체크리스트</h4>
      </div>
      <div className="p-3 space-y-2 overflow-y-auto">
        {checkItems.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition overflow-hidden"
          >
            <label className="flex items-start gap-3">
              <div className="flex-1 select-none">
                <span className="text-sm font-medium">{item.title}</span>
              </div>

              <label className="inline-flex items-center gap-1 px-2 py-1 text-xs text-slate-500 hover:text-blue-600 cursor-pointer">
                <Icon name="paperclip" size={14} />
                <span>파일 첨부</span>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileAdd(item.id, e.target.files)}
                />
              </label>
            </label>

            {/* 첨부된 파일 목록 */}
            {item.files.length > 0 && (
              <div className="mt-2 ml-7 flex  gap-2 w-0 min-w-full overflow-x-auto scrollbar-thin">
                {item.files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1 px-2 py-1 mb-3 bg-slate-100 rounded text-xs text-slate-600 shrink-0"
                  >
                    <Icon name="paper-clip" size={12} />
                    <span className="max-w-[100px] truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => handleFileRemove(item.id, idx)}
                      className="ml-1 text-red-400 cursor-pointer"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 파일 첨부 버튼 */}
            <div className="mt-2 ml-7"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
