import React from "react";
import Box from "@mui/material/Box";
import Image from "../../ui/Image";

type ImageUploaderProps = {
  src?: string;
  alt: string;
};

function ImageUploader({ src = "", alt }: ImageUploaderProps) {
  const [previewImage, setPreviewImage] = React.useState<string>(src);

  const handleImageChange = (event: any) => {
    const imageFile = event.target.files[0];

    // Check if a file is selected
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setPreviewImage(src);
    }
  };

  return (
    <Box sx={{ position: "relative", margin: "auto", width: 250 }}>
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
