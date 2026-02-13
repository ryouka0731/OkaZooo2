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
    const { data, error } = await supabase.from("videos").select("*");
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
    // video_urlをそのままurlへマッピング
    const mapped = data.map(v => ({ ...v, url: v.video_url }));
    return { error: null, data: mapped };
  } catch (err) {
    console.error("Supabase fetch exception:", err);
    return { error: err, data: [] };
  }
}
