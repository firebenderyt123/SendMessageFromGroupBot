import React from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Image from "../../ui/Image";

type ImageUploaderProps = {
  src?: string;
  alt: string;
  onChange: Function;
  onDelete: Function;
};

function ImageUploader({
  src = "",
  alt,
  onChange,
  onDelete,
}: ImageUploaderProps) {
  const [previewImage, setPreviewImage] = React.useState<string>(src);

  const handleImageChange = (event: any) => {
    const imageFile: File = event.target.files[0];

    // Check if a file is selected
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
      onChange(imageFile);
    } else {
      setPreviewImage(src);
      onChange(null);
    }
  };

  const onDeleteHandler = React.useCallback(() => {
    setPreviewImage("");
    onDelete(true);
  }, [onDelete]);

  return (
    <Box sx={{ position: "relative", margin: "auto", width: 250 }}>
      <React.Fragment>
        <input
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleImageChange}
          style={{
            position: "absolute",
            left: 0,
            opacity: 0,
            cursor: "pointer",
            height: "100%",
            width: "100%",
            zIndex: 1,
          }}
        />
        <Tooltip title="Delete" placement="top">
          <IconButton
            color="error"
            onClick={onDeleteHandler}
            sx={{ zIndex: 2 }}>
            <ClearRoundedIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
      {previewImage ? (
        <Image
          src={previewImage}
          alt={alt}
          variant="rounded"
          sx={{ height: "100%", width: "100%" }}
        />
      ) : (
        <Box height={250} width="100%" sx={{ backgroundColor: "#222" }}></Box>
      )}
    </Box>
  );
}

export default React.memo(ImageUploader);
