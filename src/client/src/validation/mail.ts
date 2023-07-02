import { RegisterOptions } from "react-hook-form";

type MailValid = {
  name: RegisterOptions;
  content: RegisterOptions;
  sendAt: RegisterOptions;
  needToSend: RegisterOptions;
};

const mailValid: MailValid = {
  name: {
    required: "Field is required",
    minLength: {
      value: 2,
      message: "Min name length is 2 chars",
    },
    maxLength: {
      value: 25,
      message: "Max name length is 25 chars",
    },
  },
  content: {
    maxLength: {
      value: 2048,
      message: "Max content length is 2048 chars",
    },
  },
  sendAt: {
    required: "Field is required",
    pattern: {
      value: /^(0\d|1\d|2[0-3]):([0-5]\d)$/,
      message: "Invalid time",
    },
  },
  needToSend: {
    required: "Field is required",
    valueAsNumber: true,
    min: {
      value: 0,
      message: "Min value is 0.",
    },
    max: {
      value: 365,
      message: "Max value is 365.",
    },
  },
};

export { mailValid };
