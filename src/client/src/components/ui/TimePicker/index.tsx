import React from "react";
import "dayjs/locale/de";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  TimePicker as Time,
  TimePickerProps,
} from "@mui/x-date-pickers/TimePicker";

const TimePicker = React.forwardRef(function TimePicker<TDate>(
  { label, ...rest }: TimePickerProps<TDate>,
  ref: React.Ref<any>
) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"de"}>
      <Time label={label} {...rest} ref={ref} />
    </LocalizationProvider>
  );
});

export default React.memo(TimePicker);
