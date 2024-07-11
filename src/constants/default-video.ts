import type { Display, Widget } from "@/components/product";
import type { Video } from "@/types/video";

export const defaultVideo: Video = {
  type: "youtube",
  id: "p9sfxpgRATM",
  title: "IL Y A QUOI DERRIÈRE LA PORTE ? (ft Eric & Ramzy, Mister V)",
  thumbnailUrl: "https://i.ytimg.com/vi/p9sfxpgRATM/maxresdefault.jpg",
  channelName: "SQUEEZIE",
  channelLogoUrl: "https://yt3.ggpht.com/ytc/AIdro_nixweCf48-XvZzG4wPT8dXw9mJNcHes4fKKoRaa5ZOs0M=s48-c-k-c0x00ffffff-no-rj",
  duration: "10:02",
  viewsCount: 9015481,
  publishedAt: new Date(),
};

export const defaultOptions: {
  theme: "light" | "dark";
  activeWidgets: Widget[];
  display: Display;
  textSize: number;
  cornerRadius: number;
  spacing: number;
} = {
  theme: "light",
  activeWidgets: [],
  display: "block",
  textSize: 16,
  cornerRadius: 32,
  spacing: 20,
};