# My Memo

Next.js(App Router)와 Supabase로 만든 간단한 개인 메모장이에요. Vercel에 배포해요.

## 기능

- 이메일과 비밀번호로 회원가입, 로그인, 로그아웃 (Supabase Auth)
- 메모 작성, 수정, 삭제
- 행 수준 보안(RLS): 각 사용자는 자기 메모만 볼 수 있어요.

## 로컬에서 실행하기

`.env.local` 파일을 만들어요. 값은 Supabase 대시보드의 **Connect** 메뉴에 있어요.

```
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

```bash
npm install
npm run dev
```

## 데이터베이스

스키마는 `supabase/migrations/`에 있어요.
