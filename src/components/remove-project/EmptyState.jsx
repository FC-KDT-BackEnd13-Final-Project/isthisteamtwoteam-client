import { EmptyTrashIcon } from "./Icons";

/**
 * 빈 상태 컴포넌트
 *
 * 삭제된 프로젝트가 하나도 없을 때 표시되는 컴포넌트입니다.
 * 빈 휴지통 아이콘과 안내 메시지를 보여줍니다.
 *
 * 사용 예시:
 * <EmptyState />
 */
const EmptyState = () => (
  <div className="px-5 py-20 text-center text-[#999]">
    {/* 빈 휴지통 아이콘 */}
    <EmptyTrashIcon />

    {/* 메인 메시지 */}
    <p className="mb-2 text-[15px]">삭제된 프로젝트가 없습니다.</p>

    {/* 안내 메시지 */}
    <p className="text-[13px] text-[#bbb]">휴지통이 비어있습니다.</p>
  </div>
);

export default EmptyState;
