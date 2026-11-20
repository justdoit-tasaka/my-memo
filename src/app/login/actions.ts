"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function readCredentials(formData: FormData) {
  return {
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
  };
}

function backToLogin(params: Record<string, string>): never {
  redirect(`/login?${new URLSearchParams(params).toString()}`);
}

export async function signIn(formData: FormData) {
  const { email, password } = readCredentials(formData);
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    backToLogin({ error: "이메일 또는 비밀번호가 올바르지 않거나, 이메일 인증이 아직 안 됐어요." });
  }

  redirect("/");
}

export async function signUp(formData: FormData) {
  const { email, password } = readCredentials(formData);
  if (password.length < 6) {
    backToLogin({ error: "비밀번호는 6자 이상이어야 해요." });
  }

  const supabase = await createClient();
  const origin = (await headers()).get("origin") ?? "";

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${origin}/auth/callback` },
  });
  if (error) {
    backToLogin({ error: `가입에 실패했어요: ${error.message}` });
  }

  // When email confirmation is off, Supabase returns a session right away.
  if (data.session) {
    redirect("/");
  }

  backToLogin({ message: "인증 메일을 보냈어요. 메일의 링크를 누른 뒤 로그인해 주세요." });
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
