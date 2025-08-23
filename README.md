# Todo List Application

현대적인 Todo 관리 애플리케이션입니다. Next.js 15와 TypeScript를 사용하여 구축하였습니다.

## 🚀 주요 기능

- ✅ **Todo 관리**: 할 일 추가, 수정, 삭제, 완료 처리
- 📝 **메모 기능**: 각 할 일에 대한 상세 메모 작성
- 🖼️ **이미지 첨부**: 할 일에 관련 이미지 업로드
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- 🎨 **현대적 UI**: Tailwind CSS를 활용한 깔끔한 디자인
- ⚡ **실시간 업데이트**: SWR을 통한 효율적인 데이터 관리

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React 18, TypeScript
- **스타일링**: Tailwind CSS
- **상태 관리**: SWR (Server State), React Hooks (Client State)
- **개발 도구**: ESLint, Prettier

## 📁 프로젝트 구조

```
src/
├── app/                          # Next.js App Router
│   ├── detail/[id]/             # Todo 상세 페이지
│   │   ├── page.tsx             # 상세 페이지 라우트
│   │   └── todo-detail-container.tsx # 상세 페이지 컨테이너
│   ├── home/
│   │   └── todo-container.tsx   # 홈페이지 컨테이너
│   ├── hooks/                   # 커스텀 훅
│   │   ├── use-todos.ts         # Todo 목록 관리 훅
│   │   └── use-todo-detail.ts   # Todo 상세 관리 훅
│   ├── lib/
│   │   └── api.ts              # API 함수들
│   ├── providers/
│   │   └── swr-provider.tsx    # SWR 설정
│   ├── globals.css             # 전역 스타일
│   ├── layout.tsx              # 루트 레이아웃
│   └── page.tsx               # 홈페이지
├── components/                  # 재사용 가능한 컴포넌트
│   ├── detail/                 # 상세 페이지 컴포넌트들
│   │   ├── detail-actions.tsx  # 액션 버튼들 (수정/삭제)
│   │   ├── detail-content.tsx  # 메인 컨텐츠 영역
│   │   ├── detail-header.tsx   # 헤더 (제목, 완료 상태)
│   │   ├── image-input.tsx     # 이미지 업로드
│   │   ├── memo.tsx           # 메모 입력/표시
│   │   └── index.tsx          # 상세 페이지 메인 뷰
│   ├── todo/                   # Todo 관련 컴포넌트들
│   │   ├── empty-state.tsx     # 빈 상태 컴포넌트
│   │   ├── todo-form.tsx       # Todo 추가 폼
│   │   ├── todo-list-item.tsx  # 개별 Todo 아이템
│   │   └── todo-list-view.tsx  # Todo 목록 뷰
│   ├── ui/                     # 공통 UI 컴포넌트
│   │   ├── button.tsx          # 재사용 가능한 버튼
│   │   └── loading.tsx         # 로딩 컴포넌트
│   └── layout/
│       └── top-nav.tsx         # 상단 네비게이션
└── public/                     # 정적 파일들
    ├── active/                 # 사용 중인 이미지들
    └── fonts/                  # 폰트 파일들
```

## 🏗️ 아키텍처 원칙

### 단일 책임 원칙 (SRP)

각 컴포넌트와 함수는 하나의 명확한 책임만을 가집니다.

- **Container 컴포넌트**: 비즈니스 로직 담당
- **Presentation 컴포넌트**: UI 렌더링과 사용자 상호작용만 담당
- **Custom Hooks**: 특정 도메인의 상태 관리 로직 캡슐화

## 📱 사용 방법

### 기본 사용법

1. **Todo 추가**: 상단 입력 필드에 할 일을 입력하고 '추가하기' 버튼 클릭
2. **완료 처리**: Todo 항목 왼쪽의 체크박스 클릭
3. **상세 보기**: Todo 항목 클릭하여 상세 페이지 이동
4. **수정**: 상세 페이지에서 제목, 메모, 이미지 수정
5. **삭제**: 상세 페이지에서 삭제 버튼 클릭

### 주요 페이지

- **홈페이지** (`/`): Todo 목록 보기 및 추가
- **상세 페이지** (`/detail/[id]`): 개별 Todo 상세 정보 및 수정
