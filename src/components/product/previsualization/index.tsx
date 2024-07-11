import React from "react";
import type { Video } from "@/types/video";

import Button from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Select from "@/components/ui/select";
import { defaultOptions, defaultVideo } from "@/constants/default-video";
import { css, cx } from "@styled-system/css";
import type { ImageExtension } from "@/types/image";
import { convertHtmlToImage } from "@/plugins/html-to-image";

import PrevisualizationCard from "./card";
import type { Widget } from "..";
import { useForm } from "react-hook-form";

const ELEMENT_ID = "image-to-download";

type ProductPrevisualizationProps = {
	className?: string;
	video?: Video;
	activeWidgets: Widget[];
};

type FormData = {
  format: ImageExtension;
  size: "0.5" | "0.75" | "1" | "1.5" | "2" | "3";
};

const ProductPrevisualization: React.FC<ProductPrevisualizationProps> = ({
	className,
	video = defaultVideo,
	activeWidgets,
}: ProductPrevisualizationProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      format: "png",
      size: "1",
    },
  });

  const handleDownload = handleSubmit(async ({ format, size }: FormData) => {
    const imageBase64 = await convertHtmlToImage(ELEMENT_ID, format);

    const link = document.createElement("a");
    link.download = `my-image-name.${format}`;
    link.href = imageBase64;
    link.click();
  });

  const handleCopy = handleSubmit(async ({ format, size }: FormData) => {
    const imageBase64 = await convertHtmlToImage(ELEMENT_ID, format);

    const blob = await fetch(imageBase64).then((res) => res.blob());

    const clipboardItemInput = new ClipboardItem({
      [blob.type]: blob,
    });

    await navigator.clipboard.write([clipboardItemInput]);
  });

  return (
    <div
      className={cx(
        css({
          position: "relative",
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          overflow: "hidden",
          minHeight: "560px",
        }),
        "background-png-like",
        className
      )}
    >
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          padding: "15px 20px 0 20px",
          alignItems: "center",
          zIndex: 1,
        })}
      >
        <h3
          className={css({
            fontSize: "22px",
            fontWeight: "semibold",
          })}
        >
          Prévisualisation
        </h3>

			<div
				className={css({
					position: "absolute",
					width: "100%",
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				})}
			>
				<PrevisualizationCard
					ref={ref}
					video={video}
					options={{
						...defaultOptions,
						activeWidgets,
					}}
				/>
			</div>

      <div
        className={css({
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <PrevisualizationCard
          ref={ref}
          video={defaultVideo}
          options={{
            ...defaultOptions,
            activeWidgets,
          }}
        />
      </div>

      <form
        className={css({
          position: "absolute",
          width: "100%",
          left: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          bg: "rgba(15, 15, 15, 0.15)",
          borderBottomRadius: "8px",
          py: "20px",
          zIndex: 1,
        })}
      >
        <Select
          {...register("size")}
          className={css({
            width: "max-content",
          })}
        >
          <option value={"0.5"}>0.5x</option>
          <option value={"0.75"}>0.75x</option>
          <option value={"1"}>1x</option>
          <option value={"1.5"}>1.5x</option>
          <option value={"2"}>2x</option>
          <option value={"3"}>3x</option>
        </Select>

        <Select
          {...register("format")}
          className={css({
            width: "max-content",
          })}
        >
          <option value={"png"}>PNG</option>
          <option value={"jpg"}>JPG</option>
          <option value={"webp"}>WEBP</option>
        </Select>

        <Button
          prefix={<Icon icon="download" size={16} />}
          color="secondary"
          onClick={handleDownload}
        >
          Télécharger
        </Button>

        <Button
          prefix={<Icon icon="copy" size={16} />}
          withoutBorder
          onClick={handleCopy}
        >
          Copier
        </Button>
      </form>
    </div>
  );
};

export default ProductPrevisualization;
