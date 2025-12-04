/**
 * 탭 버튼 컴포넌트
 *
 * 회원 타입별로 데이터를 필터링할 수 있는 탭 버튼입니다.
 * 활성화된 탭은 파란색으로 표시되며 하단에 표시선이 나타납니다.
 *
 * Props:
 * @param {Object} tab - 탭 정보 { id, label, count }
 * @param {boolean} isActive - 현재 활성화된 탭인지 여부
 * @param {Function} onClick - 탭 클릭 시 실행할 함수
 *
 * 사용 예시:
 * <TabButton
 *   tab={{ id: 'developer', label: '개발자', count: 5 }}
 *   isActive={true}
 *   onClick={() => console.log('탭 클릭')}
 * />
 */
const TabButton = ({ tab, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-[18px] text-[15px] font-medium relative transition-all ${
        isActive
          ? "text-blue-500 bg-blue-50"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {tab.label} ({tab.count})
      {/* 활성화된 탭 하단 표시선 */}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-500" />
      )}
    </button>
  );
};

export default TabButton;
