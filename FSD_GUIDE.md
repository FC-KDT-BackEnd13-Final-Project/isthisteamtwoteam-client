# Feature-Sliced Design 가이드

처음 온 사람도 빠르게 구조를 이해할 수 있도록 현재 코드베이스의 FSD 레이어와 사용 예시를 정리했습니다. `src/` 내부를 기준으로 읽으면 됩니다.

## 상위 디렉터리 한눈에 보기
```
src/
  app/           # 엔트리, 라우팅, 전역 프로바이더
  pages/         # 라우트 단위 화면(페이지 스켈레톤)
  widgets/       # 페이지를 구성하는 섹션/영역 단위 UI
  features/      # 사용자 시나리오 단위(버튼, 폼 등 상호작용)
  entities/      # 비즈니스 객체 단위 UI (Project, Board, Checklist 등)
  shared/        # 공통 라이브러리, UI 컴포넌트, 레이아웃, 설정
  components/    # 레거시 컴포넌트 묶음(점진적으로 feature/entity로 이전 권장)
  data/          # Mock 데이터 (API 대체용)
  global/        # 전역에서 재사용되는 아이콘/스타일
  assets/        # 정적 자산
```

## 레이어별 역할과 실제 예시
- **app**: 라우팅과 최상위 설정. `app/App.jsx`에서 `pages`를 라우트로 연결하고, 필요 시 `app/providers/`에 전역 Context를 둡니다.
- **pages**: URL과 1:1로 매핑되는 화면 컨테이너. 외부 의존성을 주입하고 위젯을 배치합니다. 예) `pages/dashboard/ui/DashboardPage.jsx`가 mock 데이터와 엔터티 카드들을 조립.
- **widgets**: 페이지 내의 큰 섹션. 예) `widgets/header/ui/Header.jsx`, `widgets/sidebar/ui/Sidebar.jsx`, `widgets/checklist-widget/ui/ChecklistWidget.jsx`.
- **features**: 사용자가 실행하는 구체적 액션 단위. 예) `features/user/create-user/ui/UserFormModal.jsx`에서 유저 생성 모달을 제공하고, 필요한 훅은 같은 피처 폴더의 `model/`에 둡니다.
- **entities**: 도메인 객체 표현(UI/모델). 예) `entities/project/ui/ProjectCard.jsx`, `entities/board/ui/DocumentItem.jsx`, `entities/checklist/ui/ChecklistItem.jsx`.
- **shared**: 모든 레이어가 의존 가능한 공통 요소.
  - UI: `shared/ui/Table/UserTable.jsx`, `shared/ui/Pagination/Pagination.jsx`, `shared/ui/Icon/Icon.jsx`.
  - 레이아웃: `shared/layouts/SidebarLayout.jsx`, `shared/layouts/SidebarHeaderLayout.jsx`.
  - 설정/유틸: `shared/config/tableConfig.js`, `shared/lib/date/dateUtils.js`.
- **components (legacy)**: FSD 이전에 만든 섹션/카드가 모여 있습니다. 현재도 페이지에서 사용되므로 건드리지 말고, 새 작업은 가능한 한 `widgets`/`features`/`entities`로 배치하세요. 예) `components/dashboard/StatCard.jsx`, `components/request-pending/ApprovalItem.jsx`.
- **data**: 개발 단계용 Mock. 예) `data/mockBoards.js`, `data/mockProjects.js`, `data/mockUsers.js`. 실제 API 연결 시 `features` 또는 `shared/api`로 옮기는 것을 권장합니다.
- **global**: 전역적으로 쓰이는 아이콘 등. 예) `global/components/Icons.jsx`.

## FSD 흐름 예시
- **대시보드**: `pages/dashboard/ui/DashboardPage.jsx` → 레거시 `components/dashboard` 카드들을 사용하고, 목록은 `entities/project`와 `entities/board` 컴포넌트로 렌더링. 데이터는 `data/mockBoards.js`, `data/mockProjects.js`에서 공급.
- **프로젝트 상세**: `pages/project/ui/ProjectPage.jsx` → 프로젝트 카드(`entities/project`), 보드 리스트(`entities/board`)를 조합하고, 레이아웃은 `shared/layouts/SidebarHeaderLayout.jsx`에서 제공.
- **체크리스트 위젯**: `widgets/checklist-widget/ui/ChecklistWidget.jsx` → 아이템은 `entities/checklist/ui/ChecklistItem.jsx`, 파일 첨부 로직은 `features/checklist/attach-file/model/useChecklistFiles.js`로 분리.

## 새 코드 작성 가이드
1. **레이어 선택**: 기능 범위를 먼저 정합니다.  
   - 버튼/폼 같은 사용자 액션 → `features/<name>/`
   - 특정 도메인 모델 표현 → `entities/<domain>/`
   - 페이지 내 독립 섹션 → `widgets/<section>/`
   - 라우트 화면 → `pages/<route>/ui/<PageName>.jsx`
2. **폴더 구조**: `ui/`, `model/`, `lib/` 정도로 나누어 UI와 상태/비즈니스 로직을 분리합니다. (예: `features/user/create-user/ui/UserFormModal.jsx` + `model/useUserForm.js`)
3. **공용 리소스**: 재사용 가능한 스타일/유틸/아이콘은 `shared/`로 끌어올려 중복을 피합니다.
4. **레거시 호환**: 기존 `components/`에 있는 뷰를 대체할 때는 동일한 props를 유지한 채 새 엔터티/위젯을 만든 뒤 페이지에서 교체하는 식으로 점진적으로 이동합니다.
5. **데이터 소스**: 실제 API 연동 전까지는 `data/`의 mock을 쓰고, 나중에 API로 바꾸면 해당 레이어(주로 feature)에서 데이터 접근 방식을 교체합니다.

## 빠르게 구조 파악하는 방법
- 엔트리와 라우트: `app/App.jsx`, `main.jsx`
- 현재 페이지 목록: `pages/*/ui/*Page.jsx`
- 공용 UI/레이아웃: `shared/ui/*`, `shared/layouts/*`
- 도메인별 UI: `entities/*/ui/*`
- 상호작용/폼/모달: `features/*/ui/*`
- 임시 데이터: `data/*.js`
