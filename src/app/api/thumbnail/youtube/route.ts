import { YoutubeClient } from "@/services/youtube-client";
import type { Video } from "@/types/video";
import type { NextRequest } from "next/server";

const youtubeClient = new YoutubeClient();

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q");

  if(!q) {
    return new Response("No query provided", { status: 400 });
  }

  let videoId: string | undefined;

  // - If the url is from youtube.com, then pickup the video id from the url
  if(q.includes("youtube.com")) {
    const url = new URL(q);
    videoId = url.searchParams.get("v") || undefined;
  }

  // - If the url is from youtu.be, then pickup the video id from the url
  if(q.includes("youtu.be")) {
    const url = new URL(q);
    videoId = url.pathname.split("/").pop();
  }

  if(!videoId) {
    return new Response("Invalid youtube url", { status: 400 });
  }

  const video = await youtubeClient.getVideoThumbnail(videoId);

  return new Response(JSON.stringify(video), {
    headers: {
      "content-type": "application/json",
    },
  });

  /* const apiKey = process.env.YOUTUBE_API_KEY;
  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`);

  if(!response.ok) {
    return new Response("Failed to fetch video data", { status: 500 });
  }

  const data = await response.json();
  const videoData = data.items[0];

  if(!videoData) {
    return new Response("Video not found", { status: 404 });
  }

  const video: Video = {
    type: "youtube",
    id: videoId,
    title: videoData.snippet.title,
    thumbnailUrl: videoData.snippet.thumbnails.maxres.url,
    channelName: videoData.snippet.channelTitle,
    channelLogoUrl: "",
    duration: 0,
    viewsCount: 0,
    publishedAt: new Date(videoData.snippet.publishedAt),
  };

  return new Response(JSON.stringify(video), {
    headers: {
      "content-type": "application/json",
    },
  }); */
};