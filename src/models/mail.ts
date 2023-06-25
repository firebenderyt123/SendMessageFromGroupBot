interface MAIL {
  id: string;
  name: string;
  image?: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
  totalSended: number;
  needToSend: number;
  isPaused: boolean;
}

type CreateMailData = {
  name: string;
  image?: string;
  content?: string;
  needToSend: number;
};

const MailValid = {
  name: {
    required: true,
    type: "string",
    validate: function (value: string) {
      return !value
        ? "No name value"
        : typeof value !== this.type
        ? `Invalid name type, might be ${this.type}`
        : value.length < 2
        ? "Min name length is 2 chars."
        : value.length > 18
        ? "Max name length is 18 chars."
        : /^[a-zа-яіїє]{2,18}$/i.test(value) || "Name might have only a-z, а-я";
    },
  },
  image: {
    required: false,
    type: "string",
    validate: function (value: string) {
      return !value
        ? "No image value"
        : typeof value !== this.type
        ? `Invalid image type, might be ${this.type}`
        : true;
    },
  },
  content: {
    required: false,
    type: "string",
    validate: function (value: string) {
      return !value
        ? "No content value"
        : typeof value !== this.type
        ? `Invalid content type, might be ${this.type}`
        : value.length < 10
        ? "Min content length is 10 chars."
        : value.length > 2048
        ? "Max content length is 2048 chars."
        : true;
    },
  },
  needToSend: {
    required: false,
    type: "number",
    validate: function (value: number) {
      return !value
        ? "No needToSend value"
        : typeof value !== this.type
        ? `Invalid needToSend type, might be ${this.type}`
        : value < -1
        ? "Min needToSend value is -1."
        : value > 365
        ? "Max needToSend value is 365."
        : true;
    },
  },
};

export default MAIL;
export { CreateMailData, MailValid };
