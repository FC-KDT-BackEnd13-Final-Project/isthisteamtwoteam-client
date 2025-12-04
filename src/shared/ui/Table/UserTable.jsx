import { Icons } from "../Icon/GlobalIcon";

/**
 * 사용자 테이블 컴포넌트
 *
 * 회원 목록을 테이블 형태로 표시하는 컴포넌트입니다.
 * 체크박스 선택, 수정, 삭제 기능을 제공합니다.
 *
 * Props:
 * @param {Array} columns - 테이블 컬럼 정의 배열 [{ key, label }]
 * @param {Array} users - 표시할 사용자 목록
 * @param {Array} selectedIds - 선택된 사용자 ID 배열
 * @param {Function} onSelectAll - 전체 선택/해제 함수
 * @param {Function} onSelectOne - 개별 선택/해제 함수
 * @param {Function} onEdit - 수정 버튼 클릭 함수
 * @param {Function} onDelete - 삭제 버튼 클릭 함수
 *
 * 사용 예시:
 * <UserTable
 *   columns={[{ key: 'id', label: 'ID' }, { key: 'name', label: '이름' }]}
 *   users={userList}
 *   selectedIds={[1, 2, 3]}
 *   onSelectAll={(checked) => console.log('전체 선택', checked)}
 *   onSelectOne={(id, checked) => console.log('개별 선택', id, checked)}
 *   onEdit={(id) => console.log('수정', id)}
 *   onDelete={(id) => console.log('삭제', id)}
 * />
 */
const UserTable = ({
  columns,
  users,
  selectedIds,
  onSelectAll,
  onSelectOne,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        {/* 테이블 헤더 */}
        <thead className="bg-gray-50">
          <tr>
            {/* 전체 선택 체크박스 */}
            <th className="px-5 py-4 text-left">
              <input
                type="checkbox"
                className="w-[18px] h-[18px] cursor-pointer"
                checked={users.length > 0 && selectedIds.length === users.length}
                onChange={(e) => onSelectAll(e.target.checked)}
              />
            </th>
            {/* 컬럼 헤더 */}
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-5 py-4 text-left text-sm font-semibold text-gray-500"
              >
                {col.label} ^
              </th>
            ))}
            {/* 액션 컬럼 (수정/삭제 버튼) */}
            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-500"></th>
          </tr>
        </thead>

        {/* 테이블 본문 */}
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 border-b border-gray-100"
            >
              {/* 개별 선택 체크박스 */}
              <td className="px-5 py-[18px]">
                <input
                  type="checkbox"
                  className="w-[18px] h-[18px] cursor-pointer"
                  checked={selectedIds.includes(user.id)}
                  onChange={(e) => onSelectOne(user.id, e.target.checked)}
                />
              </td>

              {/* 사용자 데이터 컬럼들 */}
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-5 py-[18px] text-sm ${
                    col.key === "id"
                      ? "text-blue-500"
                      : col.key === "name" || col.key === "companyName"
                      ? "font-medium text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  {user[col.key]}
                </td>
              ))}

              {/* 수정/삭제 버튼 */}
              <td className="px-5 py-[18px]">
                <div className="flex items-center gap-3">
                  {/* 수정 버튼 */}
                  <button
                    onClick={() => onEdit(user.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
                  >
                    {Icons.edit}
                  </button>
                  {/* 삭제 버튼 */}
                  <button
                    onClick={() => onDelete(user.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
                  >
                    {Icons.trash}
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {/* 검색 결과가 없을 때 */}
          {users.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 2}
                className="px-5 py-12 text-center text-gray-400"
              >
                검색 결과가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
