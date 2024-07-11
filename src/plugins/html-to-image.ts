import type { ImageExtension } from "@/types/image";
import { toPng, toJpeg, toBlob } from "html-to-image";

export const convertHtmlToImage = async (
  elementId: string,
  format: ImageExtension
) => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Element not found");
  }

  try {
    let imageUrl = "";

    switch (format) {
      case "jpg":
        imageUrl = await toJpeg(element, { quality: 0.95 });
        break;
      case "webp": {
        const blob = await toBlob(element, { type: "image/webp" });
        if (blob) {
          imageUrl = URL.createObjectURL(blob);
        } else {
          throw new Error("Failed to create blob");
        }
        break;
      }
      default:
        imageUrl = await toPng(element);
        break;
    }

    return imageUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
