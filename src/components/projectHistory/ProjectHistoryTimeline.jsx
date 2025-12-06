import { useMemo, useState } from "react";
import ProjectHistoryItem from "./ProjectHistoryItem";
import HistoryFilter from "./HistoryFilter";

export default function ProjectHistoryTimeline() {
  const [filter, setFilter] = useState("all");

  // TODO: 실제 데이터로 교체 필요
  const historyItems = useMemo(
    () => [
      {
        id: 1,
        dataType: "project",
        userName: "김동균",
        ip: "211.234.125.33",
        time: "2024.11.01 09:30",
        content: '프로젝트 "삼성전자 웹사이트 리뉴얼"이 생성되었습니다.',
        detail: {
          client: "삼성전자",
          period: "2024.11.01 ~ 2024.12.31",
          step: "기획",
        },
      },
      {
        id: 2,
        dataType: "project",
        userName: "김동균",
        ip: "211.234.125.33",
        time: "2024.11.01 09:45",
        content: "체크리스트 항목 5개가 추가되었습니다.",
        checklist: [
          "요구사항 정의서 작성",
          "화면 설계서 작성",
          "디자인 가이드 작성",
          "개발 환경 구축",
          "테스트 계획 수립",
        ],
      },
      {
        id: 3,
        dataType: "create",
        userName: "박지영",
        ip: "192.168.1.105",
        time: "2024.11.05 14:20",
        content: '게시글 "[기획] 메인 페이지 구조 검토"가 작성되었습니다.',
        postId: 1,
      },
      {
        id: 4,
        dataType: "create",
        userName: "이민수",
        ip: "10.20.30.142",
        time: "2024.11.05 15:30",
        content: '"[기획] 메인 페이지 구조 검토" 게시글에 댓글을 작성했습니다.',
        comment:
          "메인 배너 영역은 반응형으로 처리하고, 모바일에서는 슬라이드 형태로 변경하는 게 좋을 것 같습니다.",
        postId: 1,
      },
      {
        id: 5,
        dataType: "file",
        userName: "박지영",
        ip: "192.168.1.105",
        time: "2024.11.06 10:15",
        content: "3개의 파일이 업로드되었습니다.",
        files: [
          "화면설계서_v1.0.pdf (2.3MB)",
          "요구사항정의서_v1.0.xlsx (1.1MB)",
          "메인페이지_wireframe.fig (5.7MB)",
        ],
      },
      {
        id: 6,
        dataType: "project",
        userName: "김동균",
        ip: "211.234.125.33",
        time: "2024.11.08 09:00",
        content: "담당자가 변경되었습니다:",
        oldValue: "박지영",
        newValue: "최서연",
      },
      {
        id: 7,
        dataType: "status",
        userName: "김동균",
        ip: "211.234.125.33",
        time: "2024.11.12 11:20",
        content: "프로젝트 단계가 변경되었습니다:",
        oldValue: "기획",
        newValue: "디자인",
        detail: {
          reason: "기획 단계 완료 및 고객 승인 완료",
        },
      },
      {
        id: 8,
        dataType: "project",
        userName: "최서연",
        ip: "172.16.50.88",
        time: "2024.11.13 14:30",
        content: "공용 메모가 작성되었습니다.",
        comment:
          "디자인 작업 시 브랜드 컬러는 #0066FF 를 메인으로 사용하고, 서브 컬러는 #00C896 를 사용해주세요. 폰트는 Pretendard 기준으로 작업 부탁드립니다.",
      },
      {
        id: 9,
        dataType: "update",
        userName: "최서연",
        ip: "172.16.50.88",
        time: "2024.11.15 16:45",
        content: '게시글 "[디자인] 메인 페이지 시안 1차"가 수정되었습니다.',
        postId: 2,
      },
      {
        id: 10,
        dataType: "approval",
        userName: "최서연",
        ip: "172.16.50.88",
        time: "2024.11.18 10:00",
        content:
          '"메인페이지_디자인시안_v2.0" 문서에 대한 승인을 요청했습니다.',
        detail: {
          approver: "김동균",
        },
      },
      {
        id: 11,
        dataType: "approval",
        userName: "김동균",
        ip: "211.234.125.33",
        time: "2024.11.18 14:30",
        content: '"메인페이지_디자인시안_v2.0" 문서가 승인되었습니다.',
        comment:
          "전체적인 디자인 방향성 좋습니다. 승인합니다. 다음 단계 진행해주세요.",
      },
      {
        id: 12,
        dataType: "delete",
        userName: "박지영",
        ip: "192.168.1.105",
        time: "2024.11.27 11:00",
        content: '게시글 "[기획] 임시 작성 게시글"가 삭제되었습니다.',
        postId: 4,
      },
    ],
    [],
  );

  const filteredItems = useMemo(() => {
    if (filter === "all") return historyItems;
    return historyItems.filter((item) => item.dataType === filter);
  }, [filter, historyItems]);

  return (
    <section className="mt-8">
      {/* 필터 섹션 */}
      <div className="mb-6">
        <HistoryFilter activeFilter={filter} onChange={setFilter} />
      </div>

      {/* 타임라인 */}
      <div className="relative pl-12">
        {/* 타임라인 세로선 */}
        <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-slate-300"></div>

        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <div className="mb-4 text-4xl">📋</div>
            <p>표시할 히스토리가 없습니다.</p>
          </div>
        ) : (
          <ul className="space-y-6">
            {filteredItems.map((item) => (
              <ProjectHistoryItem key={item.id} item={item} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
