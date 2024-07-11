export type Video = {
  type: "youtube";
  id: string;
  title: string;
  thumbnailUrl: string;
  channelName: string;
  channelLogoUrl: string;
  duration: string;
  viewsCount: number;
  publishedAt: Date;
};