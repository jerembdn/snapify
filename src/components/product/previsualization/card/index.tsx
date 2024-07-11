import type { Video } from "@/types/video";
import React from "react";
import { isActiveWidgets, type Display, type Widget } from "../..";
import { css, cx } from "@styled-system/css";
import Image from "@/components/ui/image";
import { Roboto } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { useMeasure } from "@/hooks/use-measure";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

type PrevisualizationCardProps = {
  video: Video;
  options: {
    theme: "light" | "dark";
    activeWidgets: Widget[];
    display: Display;
    textSize: number;
    cornerRadius: number;
    spacing: number;
  };
};

const PrevisualizationCard = React.forwardRef<
  HTMLDivElement,
  PrevisualizationCardProps
>(({ video, options }: PrevisualizationCardProps) => {
  const buildFooter = () => {
    const viewsCount =
      isActiveWidgets(options.activeWidgets, "videoViews") && video.viewsCount;
    const publishedAt =
      isActiveWidgets(options.activeWidgets, "videoPublishedAt") &&
      video.publishedAt;
    const hasSeparator = viewsCount && publishedAt;

    return `${viewsCount ? `${viewsCount} vues` : ""}${
      hasSeparator ? " • " : ""
    }${publishedAt ? "Il y a 16 heures" : ""}`;
  };

  return (
    <motion.div
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.1,
      }}
      id="image-to-download"
      key={"container"}
      className={cx(
        roboto.className,
        css({
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          backgroundColor: options.theme === "light" ? "#fff" : "#000",
          userSelect: "none",
          overflow: "hidden",
        })
      )}
      style={{
        maxWidth: `calc(310px + ${options.spacing * 2}px)`,
        borderRadius: `${options.cornerRadius}px`,
        padding: `${options.spacing}px`,
      }}
    >
      <div
        className={css({
          position: "relative",
          display: "flex",
          overflow: "hidden",
          borderRadius: "12px",
        })}
      >
        <Image
          className={css({
            width: "310px",
            height: "175px",
            borderRadius: "12px",
          })}
          src={video.thumbnailUrl}
          alt={"Miniature de la vidéo"}
          width={1280}
          height={720}
        />

        {isActiveWidgets(options.activeWidgets, "videoDuration") && (
          <div
            className={css({
              position: "absolute",
              bottom: "10px",
              right: "10px",
              padding: "3px 4px",
              borderRadius: "4px",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "#FFF",
              fontSize: "12px",
              fontWeight: "medium",
            })}
          >
            ??:??
          </div>
        )}

        {isActiveWidgets(options.activeWidgets, "videoProgressBar") && (
          <progress
            className={css({
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "4px",
              "&::-webkit-progress-bar": {
                backgroundColor: "#717171",
              },
              "&::-webkit-progress-value": {
                backgroundColor: "#FF0000",
              },
            })}
            value={18}
            max={100}
          />
        )}
      </div>

      <div
        className={css({
          display: "flex",
          gap: "10px",
        })}
      >
        {isActiveWidgets(options.activeWidgets, "channelLogo") && (
          <Image
            className={css({
              width: "38px",
              height: "38px",
              borderRadius: "50%",
            })}
            src={video.channelLogoUrl}
            alt={`Logo de chaîne YouTube de ${video.channelName}`}
            width={38}
            height={38}
          />
        )}

        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            fontWeight: "normal",
            color: options.theme === "light" ? "#606060" : "#fff",
            flex: 1,
            lineHeight: "normal",
          })}
        >
          <div
            className={css({
              fontSize: `${options.textSize}px`,
              fontWeight: "bold",
              color: options.theme === "light" ? "#0F0F0F" : "#fff",
            })}
          >
            {video.title}
          </div>

          {isActiveWidgets(options.activeWidgets, "channelName") && (
            <div>{video.channelName}</div>
          )}

          <div>{buildFooter()}</div>
        </div>
      </div>
    </motion.div>
  );
});

export default PrevisualizationCard;
