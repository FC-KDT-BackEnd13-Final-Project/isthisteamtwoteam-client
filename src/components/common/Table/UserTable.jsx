/**
 * UserTable 컴포넌트
 * 
 * 회원 목록을 테이블 형식으로 표시하고, 
 * 선택, 수정, 삭제 기능을 제공합니다.
 */
export default function UserTable({
  columns,
  users,
  selectedIds,
  onSelectAll,
  onSelectOne,
  onEdit,
  onDelete,
  activeTab, // 👈 추가 (선택사항)
}) {
  const isAllSelected =
    users.length > 0 && users.every((user) => selectedIds.includes(user.id));

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="w-12 px-4 py-3">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="h-4 w-4 cursor-pointer rounded border-gray-300"
              />
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
              >
                {column.label}
              </th>
            ))}
            <th className="px-4 py-3 text- text-sm font-semibold text-gray-700">
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 2}
                className="px-4 py-8 text-center text-gray-500"
              >
                회원이 없습니다.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-100 transition hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(user.id)}
                    onChange={(e) => onSelectOne(user.id, e.target.checked)}
                    className="h-4 w-4 cursor-pointer rounded border-gray-300"
                  />
                </td>
                {columns.map((column) => (
                  
                  <td
                    
                    key={column.key}
                    className="px-4 py-3 text-sm text-gray-700"
                  >
                    {column.render
                      ? column.render(user[column.key], user)
                      : user[column.key] || "-"}
                  </td>
                  
                ))}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(user.id)}
                      className="rounded bg-blue-500 px-3 py-1.5 text-sm text-white transition hover:bg-blue-600"
                    >
                      수정
                    </button>
                    {/* 👇 회사 탭에서는 삭제 버튼 숨기기 (선택사항) */}
                    {activeTab !== 'company' && (
                      <button
                        onClick={() => onDelete(user.id)}
                        className="rounded bg-red-500 px-3 py-1.5 text-sm text-white transition hover:bg-red-600"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}