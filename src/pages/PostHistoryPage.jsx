import { useState } from "react";
import { useParams } from "react-router-dom";
import HistoryAccordion from "../components/postHistory/HistoryAccordion";
import PageHeader from "../components/common/PageHeader/PageHeader";

export default function PostHistoryPage() {
  const { boardId } = useParams();
  // Mock 데이터
  const [historyData] = useState({
    histories: [
      {
        id: 1,
        datetime: "2025-11-28 17:00:00",
        summary: "최종 디자인 확정 및 문서 링크 업데이트",
        details: {
          title: {
            removed: "프로젝트 A 디자인 가이드 (1차 초안)",
            added: "프로젝트 A 디자인 가이드 (2차 검토)",
          },
          editor: "김동균",
          editedAt: "2025.11.28 14:30",
          category: "디자인/퍼블리싱",
          content: {
            removed:
              "- 프로젝트 A의 디자인 가이드 초안입니다.\n\n현재는 PC 뷰 위주입니다. 모바일 대응은 아직입니다.",
            added:
              "+ 1차 검토 후 피드백을 반영한 시안입니다.\n모바일 대응 디자인을 추가했습니다. 확인 부탁드립니다.\n\n[주요 변경사항]\n1. 모바일 뷰포트 대응 추가.\n2. 메인 페이지 레이아웃 변경.",
          },
          attachments: {
            removed: ["디자인 가이드 v1.0.zip"],
            added: ["디자인 가이드 v1.5.zip"],
            unchanged: ["기획서 초안.docx"],
          },
          links: {
            removed: [],
            added: ["https://figma.com/project-a-final"],
            unchanged: ["https://docs.google.com/old-spec"],
          },
          comments: [
            {
              author: "이민수",
              datetime: "2025.11.28 16:45",
              content: "컬러 명암비 수정하면 될 것 같아요.",
            },
            {
              author: "김동균",
              datetime: "2025.11.28 15:45",
              isAdded: true,
              content:
                "+ 피드백 감사합니다! 모바일 네비게이션 위치 조정하겠습니다.",
            },
          ],
        },
      },
      {
        id: 2,
        datetime: "2025-11-28 16:05:00",
        summary: "팁원 피드백 기반 내용 및 첨부 파일 갱신",
        details: null, // 펼쳐지지 않은 상태
      },
      {
        id: 3,
        datetime: "2025-11-28 15:30:00",
        summary: "1차 검토 후 본문 내용 수정 및 상세 기능 추가",
        details: null,
      },
      {
        id: 4,
        datetime: "2025-11-28 14:30:00",
        summary: "프로젝트 초기 기획안 최초 등록",
        details: null,
      },
    ],
  });

  return (
    <div className="min-h-screen bg-[#ffffff] p-5 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]">
      <div className="mx-auto max-w-[900px]">
        <PageHeader
          title="게시글 히스토리"
          description="게시글, 첨부 파일, 댓글의 변경사항을 시간순으로 확인할 수 있습니다."
          showBackButton={true}
        />
        <HistoryAccordion histories={historyData.histories} />
      </div>
    </div>
  );
}
