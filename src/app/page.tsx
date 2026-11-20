import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NoteCard, type Note } from "@/components/note-card";
import { createNote } from "./actions";
import { signOut } from "./login/actions";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: notes, error } = await supabase
    .from("notes")
    .select("id, title, content, updated_at")
    .order("updated_at", { ascending: false })
    .returns<Note[]>();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">My Memo</h1>
        <div className="flex items-center gap-3 text-sm">
          <span className="hidden text-stone-500 sm:inline">{user.email}</span>
          <form action={signOut}>
            <button className="rounded-md border border-stone-300 px-3 py-1 hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-800">
              로그아웃
            </button>
          </form>
        </div>
      </header>

      <form
        action={createNote}
        className="mb-8 flex flex-col gap-2 rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900"
      >
        <input
          name="title"
          placeholder="제목"
          className="bg-transparent px-1 py-1 font-semibold outline-none"
        />
        <textarea
          name="content"
          rows={3}
          placeholder="메모를 입력하세요…"
          className="resize-y bg-transparent px-1 py-1 outline-none"
        />
        <div className="flex justify-end">
          <button className="rounded-lg bg-stone-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300">
            추가
          </button>
        </div>
      </form>

      {error && (
        <p className="text-sm text-red-600">메모를 불러오지 못했어요: {error.message}</p>
      )}

      {notes && notes.length === 0 && (
        <p className="py-12 text-center text-stone-500">
          아직 메모가 없어요. 첫 메모를 남겨 보세요.
        </p>
      )}

      <section className="grid gap-4 sm:grid-cols-2">
        {notes?.map((note) => <NoteCard key={note.id} note={note} />)}
      </section>
    </main>
  );
}
