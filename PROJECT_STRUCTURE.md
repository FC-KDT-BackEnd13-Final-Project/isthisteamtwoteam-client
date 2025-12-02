# 프로젝트 구조 및 Mock 데이터 설명

## 📁 프로젝트 구조

```
bn_client/
├── src/
│   ├── data/                    # Mock 데이터 폴더 (새로 생성됨)
│   │   ├── mockBoards.js       # 게시글 Mock 데이터
│   │   └── mockProjects.js     # 프로젝트 Mock 데이터
│   ├── pages/
│   │   ├── DashBoard.jsx       # 대시보드 페이지 (수정됨)
│   │   ├── BoardPage.jsx       # 게시글 상세 페이지 (수정됨)
│   │   └── ProjectPage.jsx     # 프로젝트 상세 페이지 (수정됨)
│   └── App.jsx
```

## 📝 주요 변경 사항

### 1. Mock 데이터 파일 생성

#### `src/data/mockBoards.js`
- **역할**: 게시글(Board) 관련 Mock 데이터 관리
- **포함 데이터**:
  - `pendingApprovals`: 승인 대기 중인 게시글 목록 (8개)
  - `rejectedDocuments`: 반려된 게시글 목록 (3개)
  - `allBoards`: 모든 게시글 통합 배열
  - `getBoardById(boardId)`: ID로 게시글을 찾는 헬퍼 함수

- **게시글 데이터 구조**:
```javascript
{
  id: 1,                          // 게시글 고유 ID
  title: "제목",                  // 게시글 제목
  project: "프로젝트명",          // 프로젝트 이름
  projectId: 1,                   // 프로젝트 ID (프로젝트와 연결)
  client: "㈜고객사",             // 고객사 이름
  date: "2024-11-28",             // 작성 날짜
  time: "오전 10:30",             // 작성 시간
  author: "작성자",               // 작성자 이름
  content: "게시글 내용...",      // 게시글 본문
  category: "requirements",       // 진행단계 카테고리
  files: [                        // 첨부 파일 목록
    { name: "파일명.pdf", size: "2.5MB" }
  ],
  link: "https://...",            // 첨부 링크
  approvalStatus: "pending",      // 승인 상태 (pending/approved/rejected)
  rejectReason: "반려 사유",      // 반려 사유 (반려된 경우만)
  views: 42,                      // 조회수
  createdAt: "2024-11-28 14:30"   // 작성 일시
}
```

#### `src/data/mockProjects.js`
- **역할**: 프로젝트(Project) 관련 Mock 데이터 관리
- **포함 데이터**:
  - `progressProjects`: 진행 중인 프로젝트 목록 (12개)
  - `maintenanceProjects`: 유지보수 단계 프로젝트 목록 (6개)
  - `allProjectsData`: 모든 프로젝트 상세 정보 (8개)
  - `getProjectById(projectId)`: ID로 프로젝트를 찾는 헬퍼 함수

- **프로젝트 데이터 구조**:
```javascript
{
  id: 1,                          // 프로젝트 고유 ID
  name: "프로젝트명",             // 프로젝트 이름
  client: "㈜고객사",             // 고객사 이름
  startDate: "2024/01/15",        // 시작일
  updateDate: "2024/11/20",       // 최근 업데이트일
  stage: "개발",                  // 진행 단계
  number: "PRJ-2024-001",         // 프로젝트 번호
  description: "설명...",         // 프로젝트 설명
  manager: "담당자",              // 담당 매니저
  team: ["팀원1", "팀원2"],       // 팀 구성원 목록
  progress: 65,                   // 진행률 (%)
  budget: "5억원",                // 예산
  status: "진행중"                // 상태
}
```

### 2. 페이지 수정 내역

#### `src/pages/DashBoard.jsx`
**변경 사항**:
- Mock 데이터 import 추가
- 하드코딩된 데이터 제거
- 상세한 JSDoc 주석 추가
- 코드 섹션별 주석 정리

**주요 기능**:
- 통계 카드 4개 (승인 대기, 반려, 진행중, 유지보수)
- 선택된 카드에 따라 필터링된 리스트 표시
- 모든 프로젝트 카드 그리드
- 게시글/프로젝트 클릭 시 상세 페이지로 이동

**데이터 흐름**:
```
mockBoards.js → DashBoard.jsx → 게시글 클릭 → BoardPage.jsx
                               ↓
mockProjects.js → DashBoard.jsx → 프로젝트 클릭 → ProjectPage.jsx
```

#### `src/pages/BoardPage.jsx`
**변경 사항**:
- `useLocation` hook 추가 (대시보드에서 전달받은 boardId 읽기)
- `useEffect`로 boardId에 맞는 데이터 조회
- `getBoardById()` 함수로 실제 데이터 로딩
- 로딩 상태 처리 추가
- 모든 하드코딩된 데이터를 실제 데이터로 교체

**주요 기능**:
- URL state에서 boardId 읽기
- boardId로 게시글 데이터 조회
- 게시글 상세 정보 표시 (제목, 작성자, 내용, 파일, 링크 등)
- 승인 상태에 따른 배지 표시
- 댓글 시스템 (기존 기능 유지)

**데이터 흐름**:
```
DashBoard → navigate('/project/board', { state: { boardId: 1 } })
          ↓
BoardPage → useLocation().state.boardId
          ↓
getBoardById(boardId) → 게시글 데이터 표시
```

#### `src/pages/ProjectPage.jsx`
**변경 사항**:
- `useParams` hook 추가 (URL에서 projectId 읽기)
- `useEffect`로 projectId에 맞는 데이터 조회
- `getProjectById()` 함수로 프로젝트 데이터 로딩
- `allBoards`에서 해당 프로젝트의 게시글 필터링
- 로딩 상태 처리 추가
- 프로젝트 정보 헤더 추가

**주요 기능**:
- URL 파라미터에서 projectId 읽기
- projectId로 프로젝트 데이터 조회
- 해당 프로젝트의 게시글만 필터링하여 표시
- 카테고리별 게시글 필터링
- 프로젝트 정보 (이름, 고객사, 단계, 진행률) 표시

**데이터 흐름**:
```
DashBoard → navigate('/project/1')
          ↓
ProjectPage → useParams().projectId
          ↓
getProjectById(projectId) → 프로젝트 데이터 표시
          ↓
allBoards.filter(board => board.projectId === projectId) → 게시글 목록 표시
```

## 🔄 데이터 연결 구조

### 대시보드 → 게시글 상세
```javascript
// DashBoard.jsx
const handleViewBoard = (boardId) => {
  navigate(`/project/board`, { state: { boardId } });
};

// BoardPage.jsx
const location = useLocation();
const { boardId } = location.state || {};
const board = getBoardById(boardId);
```

### 대시보드 → 프로젝트 상세
```javascript
// DashBoard.jsx
const handleViewProject = (projectId) => {
  navigate(`/project/${projectId}`);
};

// ProjectPage.jsx
const { projectId } = useParams();
const project = getProjectById(projectId);
const boards = allBoards.filter(b => b.projectId === parseInt(projectId));
```

## 🎯 주요 개선 사항

### 1. 코드 구조
- ✅ Mock 데이터를 별도 파일로 분리하여 관리
- ✅ 각 컴포넌트에 상세한 JSDoc 주석 추가
- ✅ 코드 섹션별로 명확한 구분 주석 추가
- ✅ 헬퍼 함수 제공으로 데이터 접근 간소화

### 2. 데이터 연결
- ✅ 대시보드에서 클릭한 항목의 ID가 상세 페이지에 정확히 전달됨
- ✅ ID에 맞는 실제 데이터가 화면에 표시됨
- ✅ 프로젝트와 게시글이 projectId로 연결됨

### 3. 사용자 경험
- ✅ 로딩 상태 표시 (데이터 로드 중일 때)
- ✅ 데이터 없을 때 안내 메시지 표시
- ✅ 화면 스타일은 기존 그대로 유지

## 📚 React 초보자를 위한 설명

### 1. Mock 데이터란?
실제 서버가 없을 때 사용하는 가짜 데이터입니다. 나중에 실제 API로 교체하면 됩니다.

### 2. import/export
```javascript
// mockBoards.js에서
export const pendingApprovals = [...];  // 내보내기

// DashBoard.jsx에서
import { pendingApprovals } from "../data/mockBoards";  // 가져오기
```

### 3. useParams vs useLocation
```javascript
// URL: /project/1
useParams() → { projectId: "1" }  // URL 경로에서 추출

// navigate('/board', { state: { boardId: 1 } })
useLocation().state → { boardId: 1 }  // navigate로 전달된 데이터
```

### 4. useEffect
컴포넌트가 화면에 나타날 때 또는 특정 값이 변경될 때 실행됩니다.
```javascript
useEffect(() => {
  // projectId가 변경될 때마다 데이터를 다시 조회
  const project = getProjectById(projectId);
  setProjectData(project);
}, [projectId]);  // projectId가 변경되면 다시 실행
```

### 5. 조건부 렌더링
```javascript
// 데이터가 없으면 로딩 메시지, 있으면 실제 내용 표시
if (!boardData) {
  return <div>로딩 중...</div>;
}
return <div>{boardData.title}</div>;
```

## 🚀 다음 단계 (실제 API 연결 시)

Mock 데이터를 실제 API로 교체하려면:

1. **API 함수 작성** (`src/api/boards.js`, `src/api/projects.js`)
```javascript
export async function fetchBoardById(boardId) {
  const response = await fetch(`/api/boards/${boardId}`);
  return response.json();
}
```

2. **useEffect에서 API 호출**
```javascript
useEffect(() => {
  async function loadBoard() {
    const board = await fetchBoardById(boardId);
    setBoardData(board);
  }
  loadBoard();
}, [boardId]);
```

3. **로딩/에러 상태 추가**
```javascript
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

## 💡 Best Practices 적용

1. **단일 책임 원칙**: 각 파일이 하나의 역할만 수행
2. **재사용성**: 헬퍼 함수로 중복 코드 제거
3. **가독성**: 주석과 명확한 변수명 사용
4. **유지보수성**: Mock 데이터를 별도 파일로 관리
5. **타입 안정성**: JSDoc으로 함수 파라미터 문서화

## 🎉 완료된 작업

- ✅ Mock 데이터 파일 생성 및 구조화
- ✅ 대시보드에서 Mock 데이터 사용
- ✅ 게시글 상세 페이지 데이터 연결
- ✅ 프로젝트 상세 페이지 데이터 연결
- ✅ 모든 코드에 상세한 주석 추가
- ✅ 화면 스타일 유지
- ✅ React 초보자를 위한 설명 포함
