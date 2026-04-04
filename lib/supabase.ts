import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Supabase 타입 re-export
export type { Application, SuccessCase } from "@/types";

// Supabase 설정 (환경 변수에서 가져오기)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Supabase가 설정되어 있는지 확인
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

let supabase: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

// Supabase 테이블명
export const TABLES = {
  APPLICATIONS: "applications",
  SUCCESS_CASES: "success_cases",
} as const;
