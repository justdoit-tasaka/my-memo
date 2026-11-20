"use client";

import { useState, useTransition } from "react";
import { deleteNote, updateNote } from "@/app/actions";

export type Note = {
  id: string;
  title: string;
  content: string;
  updated_at: string;
};

const dateFormat = new Intl.DateTimeFormat("ko-KR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Seoul",
});

export function NoteCard({ note }: { note: Note }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  if (editing) {
    return (
      <form
        action={(formData) =>
          startTransition(async () => {
            await updateNote(note.id, formData);
            setEditing(false);
          })
        }
        className="flex flex-col gap-2 rounded-xl border border-stone-300 bg-white p-4 dark:border-stone-700 dark:bg-stone-900"
      >
        <input
          name="title"
          defaultValue={note.title}
          placeholder="제목"
          className="rounded-md border border-stone-200 bg-transparent px-2 py-1 font-semibold dark:border-stone-700"
        />
        <textarea
          name="content"
          defaultValue={note.content}
          rows={5}
          placeholder="내용"
          className="rounded-md border border-stone-200 bg-transparent px-2 py-1 dark:border-stone-700"
        />
        <div className="flex justify-end gap-2 text-sm">
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-md px-3 py-1 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            취소
          </button>
          <button
            disabled={pending}
            className="rounded-md bg-stone-900 px-3 py-1 text-white disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900"
          >
            {pending ? "저장 중…" : "저장"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <article
      className={`flex flex-col gap-2 rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 ${pending ? "opacity-50" : ""}`}
    >
      {note.title && <h2 className="font-semibold">{note.title}</h2>}
      {note.content && (
        <p className="whitespace-pre-wrap break-words text-sm text-stone-700 dark:text-stone-300">
          {note.content}
        </p>
      )}
      <div className="mt-auto flex items-center justify-between pt-2 text-xs text-stone-500">
        <time dateTime={note.updated_at}>
          {dateFormat.format(new Date(note.updated_at))}
        </time>
        <div className="flex gap-1">
          <button
            onClick={() => setEditing(true)}
            className="rounded-md px-2 py-1 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            수정
          </button>
          <button
            disabled={pending}
            onClick={() => {
              if (!confirm("이 메모를 삭제할까요?")) return;
              startTransition(() => deleteNote(note.id));
            }}
            className="rounded-md px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
          >
            삭제
          </button>
        </div>
      </div>
    </article>
  );
}
