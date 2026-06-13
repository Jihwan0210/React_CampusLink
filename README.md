# CampusLink

대학 내에서 동아리, 스터디, 공모전 팀원을 모집하고 지원할 수 있는 웹사이트입니다.

학교 다니면서 동아리나 스터디 모집 정보가 여기저기 흩어져 있어서 찾기 불편했던 경험에서 시작한 프로젝트입니다. 모집글을 한 곳에 모아서 카테고리나 키워드로 검색할 수 있게 만들었습니다.

배포 링크: https://main.d29j56z978v9im.amplifyapp.com/

---

## 사용 기술

React 18, TypeScript, React Router DOM v6, Vite, Context API

---

## 기능

- 카테고리 필터 + 검색
- 모집글 작성/조회
- 지원하기 / 지원 취소
- 글 작성자만 마감, 삭제 가능
- 마이페이지에서 내 지원 내역, 내가 쓴 글 확인
- 로그인 후 새로고침해도 로그인 상태 유지

---

## 구현하면서 신경 쓴 부분

**로그인 상태 관리**

로그인 정보가 헤더, 상세페이지, 마이페이지 등 여러 군데서 필요해서 props로 넘기려니 복잡해졌습니다. Context API로 전역 관리하고, sessionStorage에 저장해서 새로고침해도 로그인이 풀리지 않게 했습니다.

```tsx
const [user, setUser] = useState(() => {
  const saved = sessionStorage.getItem('campuslink_user');
  return saved ? JSON.parse(saved) : null;
});
```

**글 작성자 권한 구분**

내가 쓴 글이면 마감/삭제 버튼이 보이고, 다른 사람 글이면 지원하기 버튼이 보입니다.

```tsx
const isOwner = user?.id === club.authorId;
```

**지원 취소 시 인원 처리**

지원을 취소하면 신청 내역에서 빠지면서 동시에 모집 인원도 다시 줄어들도록 처리했습니다.

---

## 라우팅

- `/` 메인
- `/clubs` 모집글 목록
- `/clubs/:id` 모집글 상세
- `/create` 모집글 작성
- `/mypage` 마이페이지
- `/login` 로그인
- `*` 404

---

## 실행

```bash
npm install
npm run dev
```
