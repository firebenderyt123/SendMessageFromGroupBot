import React, { forwardRef } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

const Input = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, variant = "standard", ...rest }, ref) => {
    return <TextField label={label} variant={variant} {...rest} ref={ref} />;
  }
);

export default React.memo(Input);
