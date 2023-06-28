import React from "react";
import { mainUrl } from "../../../config/api";

type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

function Image({ src, alt, width, height, ...rest }: ImageProps) {
  return (
    <img
      src={`${mainUrl}/${src}`}
      alt={alt}
      width={width}
      height={height}
      {...rest}
    />
  );
}

export default Image;
