# 📚 FSD (Feature-Sliced Design) 아키텍처 가이드

> 이 프로젝트는 **FSD (Feature-Sliced Design)** 아키텍처를 따릅니다.
> FSD는 확장 가능하고 유지보수가 쉬운 프론트엔드 애플리케이션을 위한 아키텍처 방법론입니다.

---

## 📋 목차

1. [FSD란?](#fsd란)
2. [프로젝트 구조 개요](#프로젝트-구조-개요)
3. [레이어별 상세 설명](#레이어별-상세-설명)
4. [디렉토리 구조](#디렉토리-구조)
5. [Import 규칙](#import-규칙)
6. [파일 추가/수정 가이드](#파일-추가수정-가이드)
7. [FAQ](#faq)

---

## FSD란?

**Feature-Sliced Design**은 프론트엔드 프로젝트를 **레이어(Layer)**와 **슬라이스(Slice)**로 구조화하는 아키텍처 패턴입니다.

### 핵심 원칙

1. **명확한 레이어 분리**: 각 레이어는 명확한 책임을 가집니다.
2. **단방향 의존성**: 상위 레이어는 하위 레이어만 의존할 수 있습니다.
3. **격리와 재사용**: 각 모듈은 독립적이며 재사용 가능합니다.

### 레이어 계층 구조 (위→아래 순으로 의존)

```
app         (최상위: 애플리케이션 초기화)
  ↓
pages       (페이지: 라우팅 단위)
  ↓
widgets     (위젯: 페이지의 큰 섹션)
  ↓
features    (기능: 사용자 액션/비즈니스 로직)
  ↓
entities    (엔티티: 비즈니스 데이터 모델)
  ↓
shared      (최하위: 공통 재사용 코드)
```

**중요**: 하위 레이어는 상위 레이어를 import할 수 없습니다!

---

## 프로젝트 구조 개요

```
src/
├── app/              # 앱 초기화 및 전역 설정
├── pages/            # 페이지 (라우팅 단위)
├── widgets/          # 위젯 (페이지의 큰 섹션)
├── features/         # 기능 (사용자 액션)
├── entities/         # 엔티티 (비즈니스 도메인)
├── shared/           # 공통 코드 (UI, utils, config)
└── data/             # Mock 데이터 (임시)
```

---

## 레이어별 상세 설명

### 1️⃣ App Layer (`src/app/`)

**역할**: 애플리케이션 초기화, 전역 설정, 라우팅

**구조**:
```
app/
├── providers/        # Context Providers (Router, Theme, etc)
├── App.jsx          # 메인 앱 컴포넌트
└── App.css          # 전역 스타일
```

**예시**:
```javascript
// src/app/App.jsx
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/dashboard/ui/DashboardPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  );
}
```

**언제 사용하나요?**
- 라우팅 설정
- 전역 Provider 설정
- 앱 레벨 초기화 로직

---

### 2️⃣ Pages Layer (`src/pages/`)

**역할**: 라우팅 단위의 페이지 컴포넌트

**구조**:
```
pages/
├── dashboard/
│   └── ui/
│       └── DashboardPage.jsx
├── user-management/
│   └── ui/
│       └── UserManagementPage.jsx
└── login/
    └── ui/
        └── LoginPage.jsx
```

**예시**:
```javascript
// src/pages/dashboard/ui/DashboardPage.jsx
import DashboardStats from '../../../widgets/dashboard-stats/ui/DashboardStats';
import ProjectList from '../../../widgets/project-list/ui/ProjectList';

export default function DashboardPage() {
  return (
    <div>
      <h1>대시보드</h1>
      <DashboardStats />
      <ProjectList />
    </div>
  );
}
```

**언제 사용하나요?**
- URL 경로에 대응하는 페이지
- Widgets를 조합하여 페이지 구성
- 페이지 레벨 데이터 fetching

**규칙**:
- 페이지는 다른 페이지를 import하면 안 됩니다
- Widgets, Features, Entities, Shared만 import 가능

---

### 3️⃣ Widgets Layer (`src/widgets/`)

**역할**: 페이지의 큰 섹션 (여러 Features 조합)

**구조**:
```
widgets/
├── header/
│   └── ui/
│       └── Header.jsx
├── sidebar/
│   └── ui/
│       └── Sidebar.jsx
└── checklist-widget/
    └── ui/
        └── ChecklistWidget.jsx
```

**예시**:
```javascript
// src/widgets/sidebar/ui/Sidebar.jsx
import Icon from '../../../shared/ui/Icon/Icon';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside>
      <nav>
        <button onClick={() => navigate('/dashboard')}>
          <Icon name="layout-dashboard" />
          대시보드
        </button>
      </nav>
    </aside>
  );
}
```

**언제 사용하나요?**
- 페이지의 독립적인 큰 블록 (Header, Sidebar, Footer 등)
- 여러 Features를 조합한 복잡한 UI
- 재사용 가능한 페이지 섹션

**규칙**:
- Widgets는 다른 Widgets를 import하면 안 됩니다
- Features, Entities, Shared만 import 가능

---

### 4️⃣ Features Layer (`src/features/`)

**역할**: 사용자 액션, 비즈니스 로직

**구조**:
```
features/
├── user/
│   ├── create-user/
│   │   └── ui/
│   │       └── UserFormModal.jsx
│   ├── edit-user/
│   │   └── ui/
│   └── delete-user/
│       └── model/
│           └── deleteUser.js
└── checklist/
    └── attach-file/
        └── model/
            └── useChecklistFiles.js
```

**세그먼트 (Segment)**:
- `ui/` - UI 컴포넌트
- `model/` - 비즈니스 로직, hooks
- `api/` - API 호출 함수
- `lib/` - 헬퍼 함수

**예시**:
```javascript
// src/features/checklist/attach-file/model/useChecklistFiles.js
import { useState } from 'react';

export function useChecklistFiles(initialItems = []) {
  const [items, setItems] = useState(initialItems);

  const addFile = (id, file) => {
    // 파일 추가 로직
  };

  return { items, addFile };
}
```

**언제 사용하나요?**
- 사용자 액션 (생성, 수정, 삭제)
- 폼 제출, 파일 업로드 등
- 비즈니스 로직이 포함된 hook

**규칙**:
- Features는 다른 Features를 import하면 안 됩니다
- Entities, Shared만 import 가능

---

### 5️⃣ Entities Layer (`src/entities/`)

**역할**: 비즈니스 도메인 모델 (데이터 중심)

**구조**:
```
entities/
├── user/
│   ├── model/
│   │   └── types.js
│   ├── api/
│   │   └── userApi.js
│   └── ui/
│       └── UserCard.jsx
├── project/
│   └── ui/
│       ├── ProjectCard.jsx
│       └── ProjectItem.jsx
└── checklist/
    └── ui/
        └── ChecklistItem.jsx
```

**예시**:
```javascript
// src/entities/project/ui/ProjectCard.jsx
export default function ProjectCard({ project }) {
  return (
    <div className="card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <span>{project.stage}</span>
    </div>
  );
}
```

**언제 사용하나요?**
- 비즈니스 도메인 모델 (User, Project, Board 등)
- 도메인별 UI 컴포넌트
- 도메인별 API 호출 함수
- 타입 정의

**규칙**:
- Entities는 다른 Entities를 import할 수 있습니다
- Shared만 추가로 import 가능
- Features, Widgets, Pages는 import 불가

---

### 6️⃣ Shared Layer (`src/shared/`)

**역할**: 공통 재사용 코드 (비즈니스 로직 없음)

**구조**:
```
shared/
├── ui/                    # 재사용 가능한 UI 컴포넌트
│   ├── Icon/
│   │   └── Icon.jsx
│   ├── Button/
│   ├── Input/
│   ├── Modal/
│   ├── Breadcrumb/
│   ├── Pagination/
│   └── Table/
├── lib/                   # 유틸리티 함수
│   ├── date/
│   │   └── dateUtils.js
│   └── format/
├── api/                   # API 설정 (axios 등)
│   └── axios.js
├── config/                # 설정 파일
│   └── tableConfig.js
├── constants/             # 상수
└── layouts/               # 레이아웃 컴포넌트
    ├── SidebarLayout.jsx
    └── SidebarHeaderLayout.jsx
```

**예시**:
```javascript
// src/shared/ui/Icon/Icon.jsx
import { User, Bell, Settings } from 'lucide-react';

const ICON_MAP = {
  user: User,
  bell: Bell,
  settings: Settings,
};

export default function Icon({ name, size = 20 }) {
  const IconComponent = ICON_MAP[name];
  return <IconComponent size={size} />;
}
```

**언제 사용하나요?**
- 프로젝트 전체에서 재사용되는 UI 컴포넌트
- 유틸리티 함수 (날짜 포맷, 문자열 처리 등)
- 전역 설정
- 공통 레이아웃

**규칙**:
- Shared는 어떤 레이어도 import하면 안 됩니다
- 외부 라이브러리만 import 가능
- 비즈니스 로직을 포함하면 안 됩니다

---

## 디렉토리 구조

### 전체 구조

```
bn_client/
├── src/
│   ├── app/
│   │   ├── providers/
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   ├── pages/
│   │   ├── login/ui/LoginPage.jsx
│   │   ├── dashboard/ui/DashboardPage.jsx
│   │   ├── user-management/ui/UserManagementPage.jsx
│   │   ├── board/ui/BoardPage.jsx
│   │   ├── project/ui/ProjectPage.jsx
│   │   ├── checklist/ui/CheckListPage.jsx
│   │   ├── notification/ui/NotificationPage.jsx
│   │   ├── request-pending/ui/RequestPendingPage.jsx
│   │   ├── remove-project/ui/RemoveProjectPage.jsx
│   │   ├── change-password/ui/ChangePasswordPage.jsx
│   │   └── find-password/ui/FindPasswordPage.jsx
│   │
│   ├── widgets/
│   │   ├── sidebar/ui/Sidebar.jsx
│   │   ├── header/ui/Header.jsx
│   │   ├── checklist-widget/ui/ChecklistWidget.jsx
│   │   ├── dashboard-stats/ui/
│   │   └── project-list/ui/
│   │
│   ├── features/
│   │   ├── user/
│   │   │   ├── create-user/ui/UserFormModal.jsx
│   │   │   ├── edit-user/ui/
│   │   │   └── delete-user/ui/
│   │   ├── auth/
│   │   │   └── login/ui/
│   │   ├── checklist/
│   │   │   ├── add-checklist/ui/
│   │   │   ├── edit-checklist/ui/
│   │   │   ├── delete-checklist/ui/
│   │   │   └── attach-file/model/useChecklistFiles.js
│   │   ├── notification/
│   │   │   ├── mark-as-read/ui/
│   │   │   └── filter-notifications/ui/
│   │   └── project/
│   │       ├── restore-project/ui/
│   │       └── delete-project/ui/
│   │
│   ├── entities/
│   │   ├── user/
│   │   │   ├── model/types.js
│   │   │   ├── api/userApi.js
│   │   │   └── ui/UserCard.jsx
│   │   ├── project/
│   │   │   ├── model/types.js
│   │   │   ├── api/projectApi.js
│   │   │   └── ui/
│   │   │       ├── ProjectCard.jsx
│   │   │       └── ProjectItem.jsx
│   │   ├── board/
│   │   │   ├── model/types.js
│   │   │   ├── api/boardApi.js
│   │   │   └── ui/DocumentItem.jsx
│   │   ├── checklist/
│   │   │   ├── model/types.js
│   │   │   └── ui/ChecklistItem.jsx
│   │   └── notification/
│   │       ├── model/types.js
│   │       └── ui/NotificationItem.jsx
│   │
│   ├── shared/
│   │   ├── ui/
│   │   │   ├── Icon/Icon.jsx
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Breadcrumb/Breadcrumb.jsx
│   │   │   ├── Pagination/Pagination.jsx
│   │   │   ├── SearchBar/SearchBar.jsx
│   │   │   ├── TabButton/TabButton.jsx
│   │   │   └── Table/UserTable.jsx
│   │   ├── lib/
│   │   │   ├── date/dateUtils.js
│   │   │   └── format/
│   │   ├── api/axios.js
│   │   ├── config/tableConfig.js
│   │   ├── constants/
│   │   └── layouts/
│   │       ├── SidebarLayout.jsx
│   │       └── SidebarHeaderLayout.jsx
│   │
│   ├── data/              # Mock 데이터 (임시)
│   │   ├── mockUsers.js
│   │   ├── mockProjects.js
│   │   ├── mockBoards.js
│   │   └── mockChecklistData.js
│   │
│   ├── main.jsx          # 엔트리 포인트
│   └── index.css         # 전역 스타일
│
├── public/
├── package.json
└── vite.config.js
```

---

## Import 규칙

### ✅ 허용되는 Import (단방향 의존성)

```
app       → pages, widgets, features, entities, shared
pages     → widgets, features, entities, shared
widgets   → features, entities, shared
features  → entities, shared
entities  → entities, shared
shared    → (외부 라이브러리만)
```

### ❌ 금지된 Import

```javascript
// ❌ 하위 레이어가 상위 레이어를 import
// shared에서 features import
import { useAuth } from '../../features/auth/login/model/useAuth';

// ❌ 같은 레벨의 다른 슬라이스 import
// features/user에서 features/project import
import { deleteProject } from '../../project/delete-project/model/deleteProject';

// ❌ pages가 다른 pages import
import DashboardPage from '../../dashboard/ui/DashboardPage';
```

### ✅ 올바른 Import 예시

```javascript
// pages → widgets, entities, shared
import Sidebar from '../../../widgets/sidebar/ui/Sidebar';
import ProjectCard from '../../../entities/project/ui/ProjectCard';
import Icon from '../../../shared/ui/Icon/Icon';

// widgets → features, entities, shared
import { useChecklistFiles } from '../../../features/checklist/attach-file/model/useChecklistFiles';
import ChecklistItem from '../../../entities/checklist/ui/ChecklistItem';
import Button from '../../../shared/ui/Button/Button';

// features → entities, shared
import UserCard from '../../../entities/user/ui/UserCard';
import { formatDate } from '../../../shared/lib/date/dateUtils';

// entities → entities, shared
import Icon from '../../../shared/ui/Icon/Icon';
import ProjectItem from '../../project/ui/ProjectItem';
```

---

## 파일 추가/수정 가이드

### 새로운 페이지 추가하기

1. **페이지 생성**
   ```bash
   mkdir -p src/pages/settings/ui
   touch src/pages/settings/ui/SettingsPage.jsx
   ```

2. **페이지 작성**
   ```javascript
   // src/pages/settings/ui/SettingsPage.jsx
   import Sidebar from '../../../widgets/sidebar/ui/Sidebar';

   export default function SettingsPage() {
     return (
       <div>
         <Sidebar />
         <h1>설정</h1>
       </div>
     );
   }
   ```

3. **라우팅 추가**
   ```javascript
   // src/app/App.jsx
   import SettingsPage from '../pages/settings/ui/SettingsPage';

   <Route path="/settings" element={<SettingsPage />} />
   ```

---

### 새로운 Feature 추가하기

**예시: 프로젝트 즐겨찾기 기능**

1. **디렉토리 생성**
   ```bash
   mkdir -p src/features/project/toggle-favorite/{ui,model}
   ```

2. **비즈니스 로직 (Model)**
   ```javascript
   // src/features/project/toggle-favorite/model/useFavorite.js
   import { useState } from 'react';

   export function useFavorite(projectId) {
     const [isFavorite, setIsFavorite] = useState(false);

     const toggleFavorite = () => {
       // API 호출
       setIsFavorite(!isFavorite);
     };

     return { isFavorite, toggleFavorite };
   }
   ```

3. **UI 컴포넌트**
   ```javascript
   // src/features/project/toggle-favorite/ui/FavoriteButton.jsx
   import { useFavorite } from '../model/useFavorite';
   import Icon from '../../../../shared/ui/Icon/Icon';

   export default function FavoriteButton({ projectId }) {
     const { isFavorite, toggleFavorite } = useFavorite(projectId);

     return (
       <button onClick={toggleFavorite}>
         <Icon name={isFavorite ? 'star-filled' : 'star'} />
       </button>
     );
   }
   ```

---

### 새로운 Entity 추가하기

**예시: Comment 엔티티**

1. **디렉토리 생성**
   ```bash
   mkdir -p src/entities/comment/{model,api,ui}
   ```

2. **타입 정의**
   ```javascript
   // src/entities/comment/model/types.js
   export const CommentType = {
     TEXT: 'text',
     FILE: 'file',
   };
   ```

3. **API**
   ```javascript
   // src/entities/comment/api/commentApi.js
   import axios from '../../../shared/api/axios';

   export const getComments = async (boardId) => {
     const response = await axios.get(`/comments/${boardId}`);
     return response.data;
   };
   ```

4. **UI**
   ```javascript
   // src/entities/comment/ui/CommentItem.jsx
   export default function CommentItem({ comment }) {
     return (
       <div className="comment">
         <p>{comment.content}</p>
         <span>{comment.author}</span>
       </div>
     );
   }
   ```

---

### Shared 컴포넌트 추가하기

**예시: Tooltip 컴포넌트**

```bash
mkdir -p src/shared/ui/Tooltip
touch src/shared/ui/Tooltip/Tooltip.jsx
```

```javascript
// src/shared/ui/Tooltip/Tooltip.jsx
export default function Tooltip({ children, text }) {
  return (
    <div className="tooltip-container">
      {children}
      <span className="tooltip-text">{text}</span>
    </div>
  );
}
```

---

## FAQ

### Q1. 어떤 컴포넌트를 어느 레이어에 둬야 하나요?

**결정 기준**:

1. **비즈니스 로직이 있나요?**
   - YES → Features 또는 Entities
   - NO → Shared UI

2. **특정 도메인(User, Project 등)과 관련이 있나요?**
   - YES → Entities
   - NO → Shared UI

3. **사용자 액션(생성, 수정, 삭제)을 처리하나요?**
   - YES → Features
   - NO → Entities 또는 Shared

4. **여러 Features를 조합한 큰 블록인가요?**
   - YES → Widgets
   - NO → Features

5. **라우팅 단위인가요?**
   - YES → Pages

---

### Q2. 같은 레이어의 다른 슬라이스를 사용하고 싶은데요?

**잘못된 방법**:
```javascript
// ❌ features/user에서 features/project import
import { deleteProject } from '../../project/delete-project/model/deleteProject';
```

**올바른 방법**:

1. **공통 로직을 Shared로 이동**
   ```javascript
   // src/shared/lib/api/deleteResource.js
   export const deleteResource = (type, id) => { /* ... */ };
   ```

2. **또는 상위 레이어(Page/Widget)에서 조합**
   ```javascript
   // src/pages/admin/ui/AdminPage.jsx
   import { deleteUser } from '../../../features/user/delete-user/model/deleteUser';
   import { deleteProject } from '../../../features/project/delete-project/model/deleteProject';
   ```

---

### Q3. Icons 같은 공통 컴포넌트는 어디에 두나요?

**현재 프로젝트 구조**:
- `src/shared/ui/Icon/Icon.jsx` - 새로운 Icon 컴포넌트 (lucide-react 사용)
- `src/global/components/Icons.jsx` - 기존 Icons 객체 (마이그레이션 중)

**권장사항**:
- 새로운 컴포넌트는 `shared/ui/Icon/Icon.jsx` 사용
- 점진적으로 기존 Icons를 새로운 Icon으로 마이그레이션

---

### Q4. Mock 데이터는 어디에 두나요?

**현재**: `src/data/`에 Mock 데이터 보관 (임시)

**프로덕션 환경**:
- `src/entities/*/api/` - 실제 API 호출 함수
- `src/shared/api/` - API 설정 (axios instance)

---

### Q5. CSS는 어디에 두나요?

**옵션**:

1. **컴포넌트와 같은 위치** (권장)
   ```
   Icon/
   ├── Icon.jsx
   └── Icon.module.css
   ```

2. **TailwindCSS 사용** (현재 프로젝트)
   - 별도 CSS 파일 불필요
   - className으로 스타일링

3. **전역 스타일**
   - `src/app/App.css` - 앱 레벨
   - `src/index.css` - 전역 스타일

---

### Q6. API 호출은 어디서 하나요?

**레이어별 역할**:

1. **Entities** - 도메인별 API 함수 정의
   ```javascript
   // src/entities/user/api/userApi.js
   export const getUsers = () => axios.get('/users');
   ```

2. **Features** - API 함수 사용 + 비즈니스 로직
   ```javascript
   // src/features/user/delete-user/model/deleteUser.js
   import { deleteUserApi } from '../../../../entities/user/api/userApi';

   export const deleteUser = async (id) => {
     // 비즈니스 로직
     await deleteUserApi(id);
   };
   ```

3. **Pages** - 데이터 fetching
   ```javascript
   // src/pages/users/ui/UsersPage.jsx
   const [users, setUsers] = useState([]);

   useEffect(() => {
     getUsers().then(setUsers);
   }, []);
   ```

---

## 📖 참고 자료

- [Feature-Sliced Design 공식 문서](https://feature-sliced.design/)
- [FSD GitHub](https://github.com/feature-sliced/documentation)
- [React에서 FSD 적용하기](https://feature-sliced.design/docs/get-started/tutorial)

---

## 🎯 요약

### FSD의 핵심 규칙

1. **레이어 분리**: app → pages → widgets → features → entities → shared
2. **단방향 의존성**: 하위 레이어는 상위 레이어를 import 불가
3. **격리**: 같은 레이어의 다른 슬라이스 간 import 금지
4. **명확한 책임**: 각 레이어는 고유한 책임을 가짐

### 파일 배치 기준

| 질문 | YES → | NO → |
|------|-------|------|
| 라우팅 단위인가? | Pages | ↓ |
| 여러 Features를 조합한 큰 블록인가? | Widgets | ↓ |
| 사용자 액션을 처리하나? | Features | ↓ |
| 특정 도메인과 관련있나? | Entities | ↓ |
| 프로젝트 전체에서 재사용되나? | Shared | - |

---

**작성일**: 2024년 12월 4일
**버전**: 1.0.0
**작성자**: FSD Migration Team
