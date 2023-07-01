import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MAIL from "../../../types/Mail";
import MailItem from "../MailItem";
import MailItemEdit from "../MailItemEdit";

type MailsListProps = {
  mailsList: MAIL[];
  onDataEdit: Function;
  onImageUpload: Function;
  onImageDelete: Function;
};

function MailsList({
  mailsList,
  onDataEdit,
  onImageUpload,
  onImageDelete,
}: MailsListProps) {
  const [itemIdEditing, setItemIdEditing] = React.useState<string | null>(null);

  const handleMailEditToggle = React.useCallback((id: string) => {
    setItemIdEditing((prev) => (prev !== id ? id : null));
  }, []);

  const mailsListElem = React.useMemo(
    () => (
      <Stack width="100%" gap={1}>
        {mailsList.map((item, index) =>
          itemIdEditing !== item.id ? (
            <MailItem
              key={index}
              mail={item}
              mailEditToggle={handleMailEditToggle}
              onDataEdit={onDataEdit}
            />
          ) : (
            <MailItemEdit
              key={index}
              mail={item}
              mailEditToggle={handleMailEditToggle}
              onDataEdit={onDataEdit}
              onImageUpload={onImageUpload}
              onImageDelete={onImageDelete}
            />
          )
        )}
      </Stack>
    ),
    [
      handleMailEditToggle,
      itemIdEditing,
      mailsList,
      onDataEdit,
      onImageDelete,
      onImageUpload,
    ]
  );

  return <Box sx={{ width: "100%" }}>{mailsListElem}</Box>;
}

export default MailsList;
