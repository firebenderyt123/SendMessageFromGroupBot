import React from "react";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import PauseCircleRoundedIcon from "@mui/icons-material/PauseCircleRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import MAIL from "../../../types/Mail";

type MailItemProps = {
  mail: MAIL;
};

function MailItem({ mail }: MailItemProps) {
  const {
    id,
    name,
    image: imgSrc,
    content,
    sendAt,
    totalSended,
    needToSend,
    isPaused,
  } = mail;

  const imageElem = React.useMemo(
    () =>
      imgSrc ? <img src={imgSrc} alt={name} width="50" height="50" /> : null,
    [imgSrc, name]
  );

  const needToSendElem = React.useMemo(
    () => (needToSend === -1 ? "∞" : needToSend),
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
        <IconButton color={isPaused ? "success" : "warning"}>
          {isPaused ? <PlayCircleRoundedIcon /> : <PauseCircleRoundedIcon />}
        </IconButton>
      </Tooltip>
    ),
    [isPaused]
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
            {totalSended}
          </Grid>
          <Grid item xs={1}>
            {needToSendElem}
          </Grid>
          <Grid container item xs={1}>
            <Grid container item gap={1}>
              <Grid item>{stopRunBtn}</Grid>
              <Grid item>
                <Tooltip title="Edit" placement="top">
                  <IconButton color="primary">
                    <AutoFixHighRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Item>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
  border: "1px solid #eee",
  boxShadow: "none",
}));

export default MailItem;
