import { useNavigate } from "react-router-dom";
import ActionButton from "../common/ActionButton/ActionButton";

/**
 * 프로젝트 리스트 아이템 컴포넌트
 * 
 * @param {object} project - 프로젝트 데이터
 * @param {function} getStageBadgeClass - 단계별 뱃지 클래스 반환 함수
 * @param {function} onEdit - 수정 핸들러
 * @param {function} onDelete - 삭제 핸들러
 * @param {boolean} isLast - 마지막 아이템 여부
 */
export default function ProjectListItem({
  project,
  getStageBadgeClass,
  onEdit,
  onDelete,
  isLast = false,
}) {

  const navigate = useNavigate();
  const handleProjectClick = () => {
        navigate(`/project/${project.projectId}`);

  }
    return (
    <div
      onClick={handleProjectClick}  // ✅ 클릭 이벤트 추가
      className={`flex items-center px-5 py-4 transition-colors hover:bg-gray-50 cursor-pointer ${  // ✅ cursor-pointer 추가
        !isLast ? "border-b border-gray-200" : ""
      }`}
    >
      {/* 프로젝트 아이콘 */}
      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-base font-semibold text-blue-500">
        {project.projectImageUrl ? (
          <img
            src={project.projectImageUrl}
            alt={project.projectName}
            className="h-full w-full object-cover rounded-lg"
          />
        ) : (
          project.projectName?.substring(0, 2) || "프"
        )}
      </div>

      {/* 프로젝트 정보 그리드 */}
      <div className="grid flex-1 grid-cols-[minmax(250px,3fr)_minmax(120px,1fr)_minmax(120px,1fr)_minmax(120px,1fr)_minmax(100px,120px)] items-center gap-8">
        {/* 프로젝트 ID & 이름 */}
        <div className="min-w-0">
          <div className="mb-1 text-[13px] font-medium text-blue-500">
            PRJ-{String(project.projectId).padStart(3, "0")}
          </div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-900">
            {project.projectName}
          </div>
        </div>

        {/* 멤버 수 */}
        <div className="text-[13px] text-gray-600">
          멤버 {project.members?.length || 0}명
        </div>

        {/* 시작일 */}
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-gray-400">시작일</span>
          <span className="text-[13px] text-gray-900">
            {project.startDate || "-"}
          </span>
        </div>

        {/* 종료일 */}
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-gray-400">종료일</span>
          <span className="text-[13px] text-gray-900">
            {project.endDate || "-"}
          </span>
        </div>

        {/* 단계 뱃지 */}
        <div className="flex justify-center">
          <span
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-medium ${getStageBadgeClass(project.stageId)}`}
          >
            {project.stageName}
          </span>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div 
        className="ml-4 flex gap-2"
        onClick={(e) => e.stopPropagation()}  // ✅ 이벤트 전파 차단
      >
        <ActionButton
          variant="edit"
          label="수정"
          onClick={() => onEdit(project.projectId)}
        />
        <ActionButton
          variant="delete"
          label="삭제"
          onClick={() => onDelete(project.projectId, project.projectName)}
        />
      </div>
    </div>
  );
}
