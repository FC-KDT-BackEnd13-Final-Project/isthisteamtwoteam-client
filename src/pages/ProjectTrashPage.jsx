import { useState } from "react";

// 아이콘 컴포넌트들
const RestoreIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
    <path d="M13,3A9,9 0 0,0 4,12H1L4.89,15.89L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z"/>
  </svg>
);

const DeleteIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
  </svg>
);

const DocumentIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#5a9aeb]">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-[#999]">
    <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
  </svg>
);

const EmptyTrashIcon = () => (
  <svg viewBox="0 0 24 24" className="mb-4 h-16 w-16 fill-[#999] opacity-30">
    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
  </svg>
);

export default function ProjectTrashPage() {
  const [activeTab, setActiveTab] = useState("posts");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock 데이터
  const [posts] = useState([
    {
      id: 1,
      title: "[기획] 임시 작성 게시글",
      author: "박지영",
      createdAt: "2024.11.10",
      deletedAt: "2024.11.27",
    },
    {
      id: 2,
      title: "[디자인] 초기 시안 작업",
      author: "최서연",
      createdAt: "2024.11.12",
      deletedAt: "2024.11.25",
    },
    {
      id: 3,
      title: "[개발] 테스트 코드 리뷰",
      author: "정민호",
      createdAt: "2024.11.18",
      deletedAt: "2024.11.28",
    },
  ]);

  const [files] = useState([
    {
      id: 1,
      name: "구버전_디자인시안.fig",
      uploader: "박지영",
      size: "7.2MB",
      uploadedAt: "2024.11.08",
      deletedAt: "2024.11.20",
    },
    {
      id: 2,
      name: "요구사항_초안.xlsx",
      uploader: "이민수",
      size: "850KB",
      uploadedAt: "2024.11.03",
      deletedAt: "2024.11.15",
    },
    {
      id: 3,
      name: "old_main_layout.psd",
      uploader: "최서연",
      size: "15.4MB",
      uploadedAt: "2024.11.10",
      deletedAt: "2024.11.22",
    },
    {
      id: 4,
      name: "test_data_v1.json",
      uploader: "정민호",
      size: "124KB",
      uploadedAt: "2024.11.16",
      deletedAt: "2024.11.26",
    },
    {
      id: 5,
      name: "meeting_notes_1105.pdf",
      uploader: "김동균",
      size: "2.1MB",
      uploadedAt: "2024.11.05",
      deletedAt: "2024.11.18",
    },
  ]);

  const currentItems = activeTab === "posts" ? posts : files;

  return (
    <div className="min-h-screen bg-white p-5 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]">
      <div className="mx-auto max-w-[1200px] rounded-[12px] bg-white p-8">
        {/* 헤더 */}
        <div className="mb-8 border-b-2 border-[#f0f0f0] pb-6">
          <h1 className="mb-2 text-[24px] font-semibold text-[#1a1a1a]">
            프로젝트 휴지통
          </h1>
          <p className="text-[14px] text-[#999]">
            삭제된 게시글과 파일을 복원하거나 영구 삭제할 수 있습니다.
          </p>
        </div>

        {/* 탭 */}
        <div className="mb-6 flex gap-2 border-b border-[#e8e8e8]">
          <button
            onClick={() => setActiveTab("posts")}
            className={`relative bottom-[-1px] border-b-2 px-6 py-3 text-[15px] font-medium transition-all ${
              activeTab === "posts"
                ? "border-[#5a9aeb] text-[#5a9aeb]"
                : "border-transparent text-[#666] hover:bg-[#f8f8f8] hover:text-[#333]"
            }`}
          >
            게시글
          </button>
          <button
            onClick={() => setActiveTab("files")}
            className={`relative bottom-[-1px] border-b-2 px-6 py-3 text-[15px] font-medium transition-all ${
              activeTab === "files"
                ? "border-[#5a9aeb] text-[#5a9aeb]"
                : "border-transparent text-[#666] hover:bg-[#f8f8f8] hover:text-[#333]"
            }`}
          >
            파일
          </button>
        </div>

        {/* 컨트롤 바 */}
        <div className="mb-5 flex items-center justify-between rounded-lg bg-[#f8f9fa] p-4">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-[14px] text-[#666]">
              <input
                type="checkbox"
                className="h-[18px] w-[18px] cursor-pointer"
              />
              <span>전체 선택</span>
            </label>

            <button className="flex items-center gap-1.5 rounded-md bg-[#5a9aeb] px-3.5 py-2 text-[13px] font-medium text-white transition-all hover:bg-[#4a8ada]">
              <RestoreIcon />
              선택 복원
            </button>

            <button className="flex items-center gap-1.5 rounded-md bg-[#ff6b6b] px-3.5 py-2 text-[13px] font-medium text-white transition-all hover:bg-[#ff5252]">
              <DeleteIcon />
              선택 영구삭제
            </button>
          </div>

          <div className="flex items-center gap-2 rounded-md border border-[#e0e0e0] bg-white px-3 py-2">
            <SearchIcon />
            <input
              type="text"
              placeholder={`${activeTab === "posts" ? "게시글" : "파일"} 검색...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[300px] border-none text-[14px] outline-none"
            />
          </div>
        </div>

        {/* 아이템 리스트 */}
        <div className="overflow-hidden rounded-lg border border-[#e8e8e8]">
          {currentItems.length === 0 ? (
            <div className="py-20 text-center text-[#999]">
              <EmptyTrashIcon />
              <p className="mb-2 text-[15px]">
                삭제된 {activeTab === "posts" ? "게시글" : "파일"}이 없습니다.
              </p>
              <p className="text-[13px] text-[#bbb]">휴지통이 비어있습니다.</p>
            </div>
          ) : (
            currentItems.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center p-5 transition-all hover:bg-[#fafafa] ${
                  index !== currentItems.length - 1
                    ? "border-b border-[#e8e8e8]"
                    : ""
                }`}
              >
                <div className="mr-4">
                  <input
                    type="checkbox"
                    className="h-[18px] w-[18px] cursor-pointer"
                  />
                </div>

                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0f6ff]">
                  <DocumentIcon />
                </div>

                <div className="flex-1">
                  <div className="mb-1 text-[15px] font-medium text-[#1a1a1a]">
                    {activeTab === "posts" ? item.title : item.name}
                  </div>
                  <div className="flex gap-3 text-[13px] text-[#999]">
                    <span>
                      {activeTab === "posts"
                        ? `작성자: ${item.author}`
                        : `업로드: ${item.uploader}`}
                    </span>
                    {activeTab === "files" && (
                      <span className="text-[#bbb]">({item.size})</span>
                    )}
                    <span>
                      {activeTab === "posts"
                        ? `작성일: ${item.createdAt}`
                        : `업로드일: ${item.uploadedAt}`}
                    </span>
                    <span className="text-[#ff6b6b]">
                      삭제일: {item.deletedAt}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex items-center gap-1 rounded-md border border-[#5a9aeb] bg-white px-3 py-1.5 text-[12px] text-[#5a9aeb] transition-all hover:bg-[#f0f6ff]">
                    <RestoreIcon />
                    복원
                  </button>
                  <button className="flex items-center gap-1 rounded-md border border-[#ff6b6b] bg-white px-3 py-1.5 text-[12px] text-[#ff6b6b] transition-all hover:bg-[#fff5f5]">
                    <DeleteIcon />
                    영구삭제
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}