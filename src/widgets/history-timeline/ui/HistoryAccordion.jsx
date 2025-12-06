import { useState } from "react";
import PostHistoryItem from "../../../entities/history/ui/PostHistoryItem";

export default function HistoryAccordion({ histories }) {
  const [openId, setOpenId] = useState(1); // 첫 번째 항목이 기본으로 열림

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div>
      {histories.map((history) => (
        <PostHistoryItem
          key={history.id}
          history={history}
          isOpen={openId === history.id}
          onToggle={() => toggleItem(history.id)}
        />
      ))}
    </div>
  );
}
