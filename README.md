# Campus Link

대학생 동아리 · 스터디 · 공모전 팀원 모집 플랫폼

## 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저에서 접속
# http://localhost:5173
```

## 테스트 계정

- ID: `admin`
- PW: `1234`

## 기술 스택

- React 18 + TypeScript
- React Router v6
- Context API
- LocalStorage
- Vite

## 배포 (Vercel)

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 배포
vercel
```

또는 GitHub에 Push 후 Vercel 대시보드에서 Import Repository.

## 프로젝트 구조

```
src/
├── context/
│   └── AuthContext.tsx     # 로그인 전역 상태
├── types/
│   └── index.ts            # TypeScript 타입 정의
├── components/
│   ├── Header.tsx          # 상단 네비게이션
│   ├── ClubCard.tsx        # 모집글 카드
│   ├── SearchBar.tsx       # 검색창
│   ├── CategoryFilter.tsx  # 카테고리 필터
│   ├── ClubForm.tsx        # 모집글 작성 폼
│   └── ApplicationList.tsx # 지원 내역 목록
└── pages/
    ├── MainPage.tsx
    ├── LoginPage.tsx
    ├── ClubsPage.tsx
    ├── ClubDetailPage.tsx
    ├── CreatePage.tsx
    ├── MyPage.tsx
    └── ErrorPage.tsx
```
