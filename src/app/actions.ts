"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function readNote(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    content: String(formData.get("content") ?? "").trim(),
  };
}

export async function createNote(formData: FormData) {
  const note = readNote(formData);
  if (!note.title && !note.content) return;

  const supabase = await createClient();
  const { error } = await supabase.from("notes").insert(note);
  if (error) throw new Error(error.message);

  revalidatePath("/");
}

export async function updateNote(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("notes")
    .update(readNote(formData))
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
}

export async function deleteNote(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("notes").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
}
