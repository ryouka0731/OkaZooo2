// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

console.log('import.meta.env:', import.meta.env);
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || "";
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase KEY:', supabaseKey);
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getAllVideos() {
  try {
    // dmm_contents テーブルに変更
    const { data, error } = await supabase.from("dmm_contents").select("*");
    // video_url値を全件console.log出力
    if (data) {
      data.forEach((v, i) => console.log(`[Supabase取得] 動画${i} video_url:`, v.video_url));
    }
    if (error) {
      console.error("Supabase fetch error:", error);
      return { error, data: [] };
    }
    if (!data) {
      console.warn("Supabase fetch: no data returned");
      return { error: 'no data', data: [] };
    }
    // データ取得ログ出力
    console.log('Supabase videos data:', data);
    // 新カラムに合わせてマッピング
    const mapped = data.map(v => ({
      id: v.id,
      title: v.title,
      actress: v.actress,
      video_url: v.video_url,
      poster_url: v.poster_url,
      thumbnail_url: v.thumbnail_url,
      affiliate_url: v.affiliate_url,
      hunted_at: v.hunted_at,
    }));
    return { error: null, data: mapped };
  } catch (err) {
    console.error("Supabase fetch exception:", err);
    return { error: err, data: [] };
  }
}
