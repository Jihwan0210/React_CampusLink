# 🔗 CampusLink

> 대학 내 동아리 · 스터디 · 공모전 모집 플랫폼

대학생들이 동아리, 스터디, 공모전 팀원을 모집하고 지원할 수 있는 웹 플랫폼입니다. 흩어져 있던 모집글을 한 곳에서 관리하고, 카테고리와 키워드로 손쉽게 탐색할 수 있도록 구현했습니다.

**🌐 [배포 바로가기](https://main.d29j56z978v9im.amplifyapp.com/)**

<br>

## 📸 미리보기

| 메인 페이지 | 모집글 상세 페이지 |
|---|---|
| (스크린샷) | (스크린샷) |

<br>

## 🛠 Tech Stack

`React 18` `TypeScript` `React Router DOM v6` `Vite` `Context API`

<br>

## ✨ 주요 기능

- 카테고리 필터 + 키워드 검색
- 모집글 작성 및 상세 조회
- 지원하기 / 지원 취소
- 작성자 전용 마감 · 삭제
- 마이페이지 (지원내역 / 내 글 관리)
- 로그인 · 로그아웃 + 세션 유지

<br>

## 💡 핵심 구현 포인트

**1. 전역 로그인 상태 관리 (AuthContext)**
로그인 상태가 Header, 상세 페이지, 마이페이지 등 여러 곳에서 필요해 prop drilling 문제가 발생했습니다. Context API로 전역 상태를 관리하고, sessionStorage와 연동해 새로고침 후에도 로그인이 유지되도록 구현했습니다.

```tsx
const [user, setUser] = useState(() => {
  const saved = sessionStorage.getItem('campuslink_user');
  return saved ? JSON.parse(saved) : null;
});
```

**2. 작성자 권한 분기 처리**
글 작성자에게는 마감/삭제 버튼을, 그 외 사용자에게는 지원하기 버튼을 노출합니다.

```tsx
const isOwner = user?.id === club.authorId;
```

**3. 지원 취소 시 정원 자동 복구**
지원 취소 시 신청 내역을 제거하면서 모집 인원(`currentMembers`)을 동시에 -1 처리하여 정원이 자동으로 갱신되도록 했습니다.

<br>

## 🗺 라우팅

| URL | 페이지 |
|---|---|
| `/` | 메인 (히어로 + 최신 모집글) |
| `/clubs` | 모집글 목록 + 검색/필터 |
| `/clubs/:id` | 모집글 상세 (지원/마감/삭제) |
| `/create` | 모집글 작성 |
| `/mypage` | 마이페이지 |
| `/login` | 로그인 |
| `*` | 404 |

<br>

## 🚀 실행 방법

```bash
git clone [repo-url]
npm install
npm run dev
```
