import { useState } from "react";

export function useChecklistFiles(initialItems = []) {
  const [checkItems, setCheckItems] = useState(initialItems);

  const handleFileAdd = (id, newFiles) => {
    setCheckItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, files: [...item.files, ...Array.from(newFiles)] }
          : item,
      ),
    );
  };

  const handleFileRemove = (itemId, fileIndex) => {
    setCheckItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, files: item.files.filter((_, idx) => idx !== fileIndex) }
          : item,
      ),
    );
  };

  return {
    checkItems,
    handleFileAdd,
    handleFileRemove,
  };
}
