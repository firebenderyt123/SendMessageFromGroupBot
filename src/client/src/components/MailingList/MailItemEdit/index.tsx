import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Item from "../Item";
import Image from "../../ui/Image";
import Input from "../../ui/Input";
import MAIL, { UpdateMailData } from "../../../types/Mail";
import { mailValid } from "../../../validation/mail";

type MailItemEditProps = {
  mail: MAIL;
  mailEditToggle: Function;
};

function MailItemEdit({ mail, mailEditToggle }: MailItemEditProps) {
  const { id, name, image: imgSrc, content, sendAt, needToSend } = mail;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateMailData>({
    defaultValues: {
      name,
      content,
      sendAt,
      needToSend,
    },
  });
  const onSubmit: SubmitHandler<UpdateMailData> = (data) => console.log(data);

  const handleMailEditToggle = React.useCallback(() => {
    // saveBtnOnClick(id, data);
  }, [id, mailEditToggle]);

  const nameField = React.useMemo(
    () => (
      <Input
        label="Name"
        {...register("name", mailValid.name)}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
    ),
    [errors.name, register]
  );

  const contentField = React.useMemo(
    () => (
      <Input
        multiline
        fullWidth
        rows={10}
        label="Content"
        variant="outlined"
        {...register("content", mailValid.content)}
        error={!!errors.content}
        helperText={errors.content?.message}
      />
    ),
    [errors.content, register]
  );

  const sendAtField = React.useMemo(
    () => (
      <Input
        label="Send at"
        {...register("sendAt", mailValid.sendAt)}
        error={!!errors.sendAt}
        helperText={errors.sendAt?.message}
      />
    ),
    [errors.sendAt, register]
  );

  const needToSendField = React.useMemo(
    () => (
      <Input
        label="Need to send"
        type="number"
        InputProps={{
          inputProps: {
            min: 0,
            max: 365,
          },
        }}
        {...register("needToSend", mailValid.needToSend)}
        error={!!errors.needToSend}
        helperText={errors.needToSend?.message}
      />
    ),
    [errors.needToSend, register]
  );

  const imageElem = React.useMemo(
    () =>
      imgSrc ? <Image src={imgSrc} alt={name} width={50} height={50} /> : null,
    [imgSrc, name]
  );

  return (
    <Item>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column" gap={2}>
          <Grid container item justifyContent="space-between">
            <Grid item>{id}</Grid>
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
            <Grid
              container
              item
              minWidth="280px"
              xs={5}
              direction="column"
              gap={1}>
              <Grid item>{nameField}</Grid>
              <Grid item>{contentField}</Grid>
            </Grid>
            <Grid item xs={2}>
              {sendAtField}
            </Grid>
            <Grid item xs={2}>
              {needToSendField}
            </Grid>
            <Grid item xs={1}>
              <Tooltip title="Save" placement="top">
                <IconButton
                  color="success"
                  onClick={handleMailEditToggle}
                  type="submit">
                  <SaveRoundedIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Item>
  );
}

export default React.memo(MailItemEdit);
