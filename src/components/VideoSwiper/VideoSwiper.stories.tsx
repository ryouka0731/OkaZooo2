// src/components/VideoSwiper/VideoSwiper.stories.tsx
import React from "react";
import VideoSwiper from "./VideoSwiper";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof VideoSwiper> = {
  title: "Components/VideoSwiper",
  component: VideoSwiper,
} satisfies Meta<typeof VideoSwiper>;
export default meta;

type Story = StoryObj<typeof VideoSwiper>;

const sampleVideos = [
  {
    id: "1",
    title: "サンプル動画1",
    actress: "女優A",
    video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster_url: "https://via.placeholder.com/320x180.png?text=Poster+1",
    thumbnail_url: "https://via.placeholder.com/160x90.png?text=Thumb+1",
    affiliate_url: "https://www.dmm.co.jp/affiliate1",
    hunted_at: "2024-01-01T12:00:00+09:00"
    ,url: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "2",
    title: "サンプル動画2",
    actress: "女優B",
    video_url: "https://www.w3schools.com/html/movie.mp4",
    poster_url: "https://via.placeholder.com/320x180.png?text=Poster+2",
    thumbnail_url: "https://via.placeholder.com/160x90.png?text=Thumb+2",
    affiliate_url: "https://www.dmm.co.jp/affiliate2",
    hunted_at: "2024-01-02T12:00:00+09:00",
    url: "https://www.w3schools.com/html/movie.mp4"
  }
];


// 旧propsや不要な互換用データは削除済み。現行dmm_contentsスキーマ・props仕様のみ対応。
// sampleVideosはVideoSwiper.tsxのVideoData型（dmm_contentsスキーマ）に完全準拠

export const Default: Story = {
  render: () => (
    <VideoSwiper
      videos={sampleVideos}
      slidesPerView={1}
      show={true}
    />
  ),
};
