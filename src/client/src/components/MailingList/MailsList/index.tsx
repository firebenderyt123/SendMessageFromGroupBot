import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MAIL from "../../../types/Mail";
import MailItem from "../MailItem";

type MailsListProps = {
  mailsList: MAIL[];
};

function MailsList({ mailsList }: MailsListProps) {
  const mailsListElem = React.useMemo(
    () => (
      <Stack width="100%" gap={1}>
        {mailsList.map((item, index) => (
          <MailItem key={index} mail={item} />
        ))}
      </Stack>
    ),
    [mailsList]
  );

  return <Box sx={{ width: "100%" }}>{mailsListElem}</Box>;
}

export default MailsList;
