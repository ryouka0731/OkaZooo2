import Header from './components/Header/Header'
import OkaZoooLogo from './components/OkaZoooLogo/OkaZoooLogo'
import Main from './components/Main/Main'
import { AnimatePresence, motion } from 'framer-motion'

import { useState, useEffect } from 'react';
import TutorialPopup from './components/TutorialPopup/TutorialPopup';
import VideoSwiper from './components/VideoSwiper/VideoSwiper';
import { getAllVideos } from './lib/supabase';

function App() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);

  const [videos, setVideos] = useState<{id: string; title: string; url: string;}[]>([]);
  
  useEffect(() => {
    getAllVideos()
      .then((result) => {
        console.log('Supabaseレスポンス:', result);
        // データ構造確認ログ
        if (result && result.data) {
          console.log('取得videos配列:', result.data);
          result.data.forEach((v, i) => console.log(`動画${i}:`, v));
          setVideos(result.data);
        } else {
          console.warn('result.dataが存在しません:', result);
          setVideos([]);
        }
        if (result.error) {
          alert('動画データ取得に失敗しました: ' + result.error);
          console.error('動画データ取得エラー:', result.error);
        }
      })
      .catch((err) => {
        console.log('Supabaseレスポンス取得catch:', err);
        alert('動画データ取得時にエラーが発生しました: ' + err);
        console.error('動画データ取得例外:', err);
      });
  }, []);

  // 3枚目視聴後ポップアップ表示
  const handleSlideChange = (idx: number) => {
    setVideoIndex(idx);
    if (idx === 2) setShowTutorial(true);
  };

  return (
    <main className="h-screen w-screen flex flex-row bg-black font-[roboto] font-bold text-white">
      {/* 左側80%: メインコンテンツ */}
      <section className="flex flex-col flex-1 overflow-hidden justify-center items-center">
        <Header />
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12 }}
            className="w-full h-full flex flex-col justify-center items-center backdrop-blur-lg bg-black/40 rounded-3xl shadow-xl border border-white/10"
          >
            {/* VideoSwiperをMainの代わりに配置 */}
            <VideoSwiper
              videos={videos}
              onSlideChange={handleSlideChange}
            />
          </motion.div>
        </AnimatePresence>
        <TutorialPopup open={showTutorial} onClose={() => setShowTutorial(false)} />
      </section>
      {/* 右側20%: タイトル・女優名・進捗バー */}
      <aside className="w-[20vw] min-w-[240px] h-full flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl border-l border-white/10 shadow-2xl">
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20"
        >
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl font-extrabold text-[#FF69B4] drop-shadow-lg">OkaZooo</h1>
            <OkaZoooLogo />
          </div>
          <div className="text-xl font-bold text-white">女優名: <span className="text-[#FF69B4]">未設定</span></div>
          <div className="w-full h-4 bg-black/60 rounded-full overflow-hidden border border-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ type: 'spring', stiffness: 120, damping: 10 }}
              className="h-full bg-[#FF69B4] rounded-full shadow-md"
            />
          </div>
        </motion.div>
        {/* X(Twitter)共有ボタン */}
        <button
          className="mt-8 px-4 py-2 bg-[#1DA1F2] text-white rounded-full shadow hover:bg-[#0d8ddb] transition font-bold text-lg"
          onClick={() => {
            const actress = '未設定'; // TODO: 動的に取得
            const count = 60; // TODO: 動的に取得
            const text = `今からズーってきたわ。本日の獲物【${actress}】でハント成功。通算：${count}/1000ズリ！ ※用法・用量を守って正しくズーりましょう。 #OkaZooo`;
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
          }}
        >
          X(Twitter)でシェア
        </button>
      </aside>
    </main>
  );
}

export default App
