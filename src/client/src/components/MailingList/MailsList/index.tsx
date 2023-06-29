import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MAIL, { UpdateMailData } from "../../../types/Mail";
import MailItem from "../MailItem";
import MailItemEdit from "../MailItemEdit";

type MailsListProps = {
  mailsList: MAIL[];
  onDataEdit: Function;
};

function MailsList({ mailsList, onDataEdit }: MailsListProps) {
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
            />
          )
        )}
      </Stack>
    ),
    [handleMailEditToggle, itemIdEditing, mailsList, onDataEdit]
  );

  return <Box sx={{ width: "100%" }}>{mailsListElem}</Box>;
}

export default MailsList;
