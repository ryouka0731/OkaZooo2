// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || "";
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getAllVideos() {
  try {
    // dmm_contents テーブルに変更
    const { data, error } = await supabase.from("dmm_contents").select("*");
    // video_url値を全件console.log出力
    if (data) {
      data.forEach((v, i) => {});
    }
    if (error) {
      return { error, data: [] };
    }
    if (!data) {
      return { error: 'no data', data: [] };
    }
    // データ取得ログ出力
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
    return { error: err, data: [] };
  }
}
