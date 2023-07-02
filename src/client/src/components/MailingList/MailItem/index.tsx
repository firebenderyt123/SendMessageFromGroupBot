import React from "react";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import PauseCircleRoundedIcon from "@mui/icons-material/PauseCircleRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Item from "../Item";
import Image from "../../ui/Image";
import MAIL from "../../../types/Mail";

type MailItemProps = {
  mail: MAIL;
  mailEditToggle: Function;
  onDataEdit: Function;
  onDelete: Function;
};

function MailItem({
  mail,
  mailEditToggle,
  onDataEdit,
  onDelete,
}: MailItemProps) {
  const {
    id,
    name,
    image: imgSrc,
    content,
    sendAt,
    totalSended,
    needToSend,
    isPaused: paused,
  } = mail;

  const [isPaused, setIsPaused] = React.useState<boolean>(paused);

  const handleStopRunBtnOnClick = React.useCallback(() => {
    setIsPaused((prev) => !prev);
    onDataEdit(id, { isPaused: !isPaused });
  }, [id, isPaused, onDataEdit]);

  const handleMailEditOnClick = React.useCallback(() => {
    mailEditToggle(id);
  }, [id, mailEditToggle]);

  const handleDeleteOnClick = React.useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  const imageElem = React.useMemo(
    () =>
      imgSrc ? <Image src={imgSrc} alt={name} sx={{ margin: "auto" }} /> : null,
    [imgSrc, name]
  );

  const needToSendElem = React.useMemo(
    () => (needToSend === 0 ? "∞" : needToSend),
    [needToSend]
  );

  const statusElem = React.useMemo(
    () => (
      <Chip
        label={isPaused ? "Paused" : "Active"}
        color={isPaused ? "warning" : "success"}
      />
    ),
    [isPaused]
  );

  const stopRunBtn = React.useMemo(
    () => (
      <Tooltip title={isPaused ? "Run" : "Stop"} placement="top">
        <IconButton
          color={isPaused ? "success" : "warning"}
          onClick={handleStopRunBtnOnClick}>
          {isPaused ? <PlayCircleRoundedIcon /> : <PauseCircleRoundedIcon />}
        </IconButton>
      </Tooltip>
    ),
    [handleStopRunBtnOnClick, isPaused]
  );

  const deleteBtn = React.useMemo(
    () => (
      <Tooltip title="Delete" placement="top">
        <IconButton color="error" onClick={handleDeleteOnClick}>
          <DeleteForeverRoundedIcon />
        </IconButton>
      </Tooltip>
    ),
    [handleDeleteOnClick]
  );

  return (
    <Item>
      <Grid container direction="column" gap={2}>
        <Grid container item justifyContent="space-between">
          <Grid item>{id}</Grid>
          <Grid item>{statusElem}</Grid>
        </Grid>
        <Grid
          container
          item
          direction="row"
          alignItems="center"
          flexWrap="wrap">
          <Grid item xs={2}>
            {imageElem}
          </Grid>
          <Grid item minWidth="280px" xs={5}>
            <Typography component="h3">{name}</Typography>
            <Typography textAlign="left">{content}</Typography>
          </Grid>
          <Grid item xs={2}>
            {sendAt}
          </Grid>
          <Grid item xs={1}>
            {needToSendElem}
          </Grid>
          <Grid item xs={1}>
            {totalSended}
          </Grid>
          <Grid container item xs={1}>
            <Grid container item gap={1}>
              <Grid item>{stopRunBtn}</Grid>
              <Grid item>
                <Tooltip title="Edit" placement="top">
                  <IconButton color="primary" onClick={handleMailEditOnClick}>
                    <AutoFixHighRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>{deleteBtn}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Item>
  );
}

export default React.memo(MailItem);
