import { signIn, signUp } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="mb-1 text-3xl font-bold">My Memo</h1>
      <p className="mb-8 text-sm text-stone-500">
        로그인하고 나만의 메모를 남겨 보세요.
      </p>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}
      {message && (
        <p className="mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          {message}
        </p>
      )}

      <form className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm">
          이메일
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-base dark:border-stone-700 dark:bg-stone-900"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          비밀번호
          <input
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="current-password"
            className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-base dark:border-stone-700 dark:bg-stone-900"
          />
        </label>
        <button
          formAction={signIn}
          className="mt-2 rounded-lg bg-stone-900 px-3 py-2 font-medium text-white hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
        >
          로그인
        </button>
        <button
          formAction={signUp}
          className="rounded-lg border border-stone-300 px-3 py-2 font-medium hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800"
        >
          회원가입
        </button>
      </form>
    </main>
  );
}
