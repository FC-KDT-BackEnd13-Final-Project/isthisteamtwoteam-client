/**
 * 브레드크럼(Breadcrumb) 컴포넌트
 *
 * 현재 페이지의 위치를 표시하는 네비게이션 컴포넌트입니다.
 * Dashboard > Members > 회원관리 형태로 경로를 보여줍니다.
 *
 * 사용 예시:
 * <Breadcrumb />
 */
const Breadcrumb = () => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <a href="#" className="hover:text-gray-600">
        Dashboard
      </a>
      <span className="text-gray-300">▸</span>
      <a href="#" className="hover:text-gray-600">
        Members
      </a>
      <span className="text-gray-300">▸</span>
      <span className="text-blue-500 font-medium">회원관리</span>
    </div>
  );
};

export default Breadcrumb;
