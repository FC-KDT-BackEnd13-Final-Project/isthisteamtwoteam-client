import { useNavigate } from "react-router-dom";

/**
 * 공통 페이지 헤더 컴포넌트
 * 
 * @param {string} title - 페이지 제목
 * @param {string} description - 페이지 설명 (선택)
 * @param {boolean} showBackButton - 뒤로가기 버튼 표시 여부
 * @param {function} onBack - 뒤로가기 버튼 클릭 핸들러 (선택, 기본값: navigate(-1))
 * @param {React.ReactNode} rightContent - 우측에 표시할 추가 컨텐츠 (선택)
 */
export default function PageHeader({
  title,
  description,
  showBackButton = false,
  onBack,
  rightContent,
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-[28px] font-semibold text-[#1a1a1a]">{title}</h1>
        <div className="flex items-center gap-2">
          {rightContent}
          {showBackButton && (
            <button
              onClick={handleBack}
              className="cursor-pointer rounded-[6px] border border-[#d0d0d0] bg-white px-4 py-2 text-[13px] text-[#666] transition-all duration-200 hover:bg-[#f5f5f5]"
            >
              ← 돌아가기
            </button>
          )}
        </div>
      </div>
      {description && (
        <p className="text-[14px] text-[#666]">{description}</p>
      )}
    </div>
  );
}

