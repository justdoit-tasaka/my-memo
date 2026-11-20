import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Supabase sends users here from the confirmation email with a one-time code.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}/`);
    }
  }

  const params = new URLSearchParams({
    error: "인증 링크가 만료됐거나 잘못됐어요. 다시 로그인해 주세요.",
  });
  return NextResponse.redirect(`${origin}/login?${params.toString()}`);
}
