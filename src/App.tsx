import { useState, useEffect } from 'react';
import VideoSwiper from './components/VideoSwiper/VideoSwiper';
import { getAllVideos } from './lib/supabase';

function App() {
  const [videoIndex, setVideoIndex] = useState(0);
  const [videos, setVideos] = useState<{id: string; title: string; url: string;}[]>([]);

  useEffect(() => {
    getAllVideos()
      .then((result) => {
        if (result && result.data) {
          setVideos(result.data);
        } else {
          setVideos([]);
        }
      })
      .catch(() => {
        setVideos([]);
      });
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        background: 'black',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <VideoSwiper
        videos={videos}
        onSlideChange={setVideoIndex}
        className="w-full h-full"
      />
    </div>
  );
}

export default App;
