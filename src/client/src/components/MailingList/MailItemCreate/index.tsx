import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Item from "../Item";
import Input from "../../ui/Input";
import { CreateMailData } from "../../../types/Mail";
import { mailValid } from "../../../validation/mail";

type FieldsData = {
  name: string;
};

type MailItemEditProps = {
  onDataCreate: Function;
  onCancel: Function;
};

function MailItemCreate({ onDataCreate, onCancel }: MailItemEditProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldsData>({
    defaultValues: {
      name: "",
    },
  });
  const onSubmit: SubmitHandler<FieldsData> = React.useCallback(
    (data) => {
      const retData: CreateMailData = {
        ...data,
        content: "",
        sendAt: "00:00",
        needToSend: 0,
      };
      onDataCreate(retData);
    },
    [onDataCreate]
  );

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

  const onCancelHandler = React.useCallback(() => {
    onCancel();
  }, [onCancel]);

  const cancelBtn = React.useMemo(
    () => (
      <Tooltip title="Cancel" placement="top">
        <IconButton color="error" onClick={onCancelHandler}>
          <CancelRoundedIcon />
        </IconButton>
      </Tooltip>
    ),
    [onCancelHandler]
  );

  return (
    <Item>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column" gap={2}>
          <Grid
            container
            item
            direction="row"
            alignItems="center"
            flexWrap="wrap">
            <Grid item>{nameField}</Grid>
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

export default React.memo(MailItemCreate);
