import type { Video } from "@/types/video";
import { youtube } from "@googleapis/youtube";
import { env } from "env.mjs";
import { z } from "zod";

// - Zod schema for the youtube video data
const youtubeVideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnailUrl: z.string(),
  channelName: z.string(),
  channelLogoUrl: z.string(),
  duration: z.string(),
  viewsCount: z.number(),
  publishedAt: z.date(),
});

export class YoutubeClient {
  private readonly client;

  constructor(apiKey: string = env.YOUTUBE_API_KEY) {
    this.client = youtube({
      auth: apiKey,
      version: "v3",
    });
  }

  async getVideoThumbnail(id: string): Promise<Video> {
    const thumbnailResponse = await this.client.videos.list({
      part: ["snippet", "contentDetails", "statistics"],
      id: [id],
    });

    const video = thumbnailResponse.data.items?.[0];

    console.log(video);

    if (!video || !video.snippet || !video.contentDetails || !video.statistics) {
      throw new Error("Failed to fetch video data");
    }

    const thumbnailUrl = video.snippet?.thumbnails?.maxres?.url || video.snippet?.thumbnails?.standard?.url || video.snippet?.thumbnails?.high?.url || video.snippet?.thumbnails?.medium?.url || video.snippet?.thumbnails?.default?.url || "";

    const viewsCount = Number.parseInt(video.statistics?.viewCount || "0", 10);

    const youtubeVideo = youtubeVideoSchema.parse({
      id: video.id,
      title: video.snippet?.title,
      thumbnailUrl,
      channelName: video.snippet?.channelTitle,
      channelLogoUrl: "",
      duration: video.contentDetails?.duration,
      viewsCount,
      publishedAt: new Date(video.snippet?.publishedAt || ""),
    });

    const duration = youtubeVideo.duration.replace("PT", "").replace("H", ":").replace("M", ":").replace("S", "");

    // @ts-ignore
    const channelResponse = await this.client.channels.list({
      part: ["snippet"],
      id: [video.snippet.channelId],
    });

    // @ts-ignore
    const channel = channelResponse.data.items?.[0];

    if (channel) {
      youtubeVideo.channelLogoUrl = channel.snippet?.thumbnails?.default?.url || "";
    }

    return {
      ...youtubeVideo,
      duration,
      type: "youtube",
    };
  }
}