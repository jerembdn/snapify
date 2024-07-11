import type { Video } from "@/types/video";
import { requester } from "@tonightpass/requester";

export const getYoutubeThumbnail = async (url: string) => requester().get<Video>(`/api/thumbnail/youtube?url=${url}`);
