import React from "react";
import Avatar, { AvatarProps } from "@mui/material/Avatar";
import { rootUrl } from "../../../config/api";

function Image({ src, alt, ...rest }: AvatarProps) {
  const imgSrc = React.useMemo(
    () => (!src?.startsWith("data:image") ? `${rootUrl}/${src}` : src),
    [src]
  );

  return <Avatar src={imgSrc} alt={alt} {...rest} />;
}

export default React.memo(Image);
