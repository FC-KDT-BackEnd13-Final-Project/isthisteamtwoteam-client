import { ClipboardIcon } from "./Icons";

/**
 * 빈 상태 컴포넌트
 *
 * 체크리스트가 하나도 없을 때 표시되는 컴포넌트입니다.
 * 사용자에게 새 체크리스트 추가를 안내합니다.
 */
const EmptyState = () => (
  <div className="px-5 py-[60px] text-center text-[#999]">
    {/* 클립보드 아이콘 */}
    <ClipboardIcon />

    {/* 메인 메시지 */}
    <p className="mb-2 text-[16px]">등록된 체크리스트가 없습니다</p>

    {/* 안내 메시지 */}
    <p className="text-[14px] text-[#cbd5e0]">
      + 버튼을 눌러 새로운 체크리스트를 추가하세요
    </p>
  </div>
);

export default EmptyState;
