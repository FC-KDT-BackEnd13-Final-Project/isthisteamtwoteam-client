/**
 * 빈 상태 컴포넌트
 *
 * 데이터가 없을 때 표시되는 범용 빈 상태 컴포넌트입니다.
 * 아이콘, 메인 메시지, 서브 메시지를 표시합니다.
 *
 * 사용 예시:
 * <EmptyState
 *   icon={<ClipboardIcon />}
 *   message="등록된 체크리스트가 없습니다"
 *   subMessage="+ 버튼을 눌러 새로운 체크리스트를 추가하세요"
 * />
 */
const EmptyState = ({ icon, message, subMessage }) => (
  <div className="text-center py-[60px] px-5 text-[#999]">
    {/* 아이콘 */}
    {icon}

    {/* 메인 메시지 */}
    <p className="text-[16px] mb-2">{message}</p>

    {/* 안내 메시지 */}
    {subMessage && (
      <p className="text-[14px] text-[#cbd5e0]">{subMessage}</p>
    )}
  </div>
);

export default EmptyState;