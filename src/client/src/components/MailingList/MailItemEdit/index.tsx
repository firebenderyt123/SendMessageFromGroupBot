import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ImageUploader from "../ImageUploader";
import Item from "../Item";
import Input from "../../ui/Input";
import TimePicker from "../../ui/TimePicker";
import MAIL, { UpdateMailData, UploadMailImageData } from "../../../types/Mail";
import { mailValid } from "../../../validation/mail";

type FieldsData = {
  name: string;
  content: string;
  sendAt: Dayjs;
  needToSend: number;
};

type MailItemEditProps = {
  mail: MAIL;
  mailEditToggle: Function;
  onDataEdit: Function;
  onImageUpload: Function;
  onImageDelete: Function;
};

function MailItemEdit({
  mail,
  mailEditToggle,
  onDataEdit,
  onImageUpload,
  onImageDelete,
}: MailItemEditProps) {
  const { id, name, image: imgSrc, content, sendAt, needToSend } = mail;

  const [imageToUpload, setImageToUpload] = React.useState<File | null>(null);
  const [isImageDelete, setIsImageDelete] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldsData>({
    defaultValues: {
      name,
      content,
      needToSend,
    },
  });
  const onSubmit: SubmitHandler<FieldsData> = React.useCallback(
    (data) => {
      const retData: UpdateMailData = {
        ...data,
        sendAt: data.sendAt.format("HH:mm"),
      };
      mailEditToggle(id);
      onDataEdit(id, retData);
      if (imageToUpload) {
        const imgData: UploadMailImageData = {
          image: imageToUpload,
        };
        onImageUpload(id, imgData);
      } else if (isImageDelete) {
        onImageDelete(id);
      }
    },
    [
      id,
      imageToUpload,
      isImageDelete,
      mailEditToggle,
      onDataEdit,
      onImageDelete,
      onImageUpload,
    ]
  );

  const onCancel = React.useCallback(
    () => mailEditToggle(id),
    [id, mailEditToggle]
  );

  const onImageUploadHandler = React.useCallback(
    (image: File | null) => {
      setImageToUpload(image);
      setIsImageDelete(false);
    },
    [setImageToUpload]
  );

  const onImageDeleteHandler = React.useCallback((isDeleted: boolean) => {
    setIsImageDelete(isDeleted);
  }, []);

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
      <Controller
        control={control}
        name="sendAt"
        rules={mailValid.sendAt}
        defaultValue={dayjs(`2022-04-17T${sendAt}`)}
        render={({ field }) => (
          <TimePicker
            label="Send at"
            onChange={field.onChange as any}
            value={field.value || null}
            slotProps={{
              textField: {
                error: !!errors.sendAt,
                helperText: errors.sendAt?.message,
              },
            }}
          />
        )}
      />
    ),
    [control, errors.sendAt, sendAt]
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
    () => (
      <ImageUploader
        src={imgSrc}
        alt={name}
        onChange={onImageUploadHandler}
        onDelete={onImageDeleteHandler}
      />
    ),
    [imgSrc, name, onImageDeleteHandler, onImageUploadHandler]
  );

  const cancelBtn = React.useMemo(
    () => (
      <Tooltip title="Cancel" placement="top">
        <IconButton color="error" onClick={onCancel}>
          <CancelRoundedIcon />
        </IconButton>
      </Tooltip>
    ),
    [onCancel]
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
            <Grid container item xs={1}>
              <Grid container item gap={1}>
                <Grid item>{cancelBtn}</Grid>
                <Grid item>
                  <Tooltip title="Save" placement="top">
                    <IconButton color="success" type="submit">
                      <SaveRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Item>
  );
}

export default React.memo(MailItemEdit);
