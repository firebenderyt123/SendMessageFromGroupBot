interface MAIL {
  id: string;
  name: string;
  image?: string;
  content: string;
  sendAt: string;
  totalSended: number;
  needToSend: number;
  isPaused: boolean;
}

type CreateMailData = {
  name: string;
  content: string;
  sendAt: string;
  needToSend: number;
  totalSended: number;
  isPaused: boolean;
};

type UpdateMailData = {
  name?: string;
  content?: string;
  sendAt?: string;
  needToSend?: number;
  totalSended?: number;
  isPaused?: boolean;
};

const MailValid = {
  name: {
    required: true,
    type: "string",
    validate: function (value: string) {
      return typeof value !== this.type
        ? `Invalid name type, might be ${this.type}`
        : value.length < 2
        ? "Min name length is 2 chars."
        : value.length > 18
        ? "Max name length is 18 chars."
        : /^[a-zа-яіїє]{2,18}$/i.test(value) || "Name might have only a-z, а-я";
    },
  },
  content: {
    required: false,
    type: "string",
    validate: function (value: string) {
      return typeof value !== this.type
        ? `Invalid content type, might be ${this.type}`
        : value.length < 10
        ? "Min content length is 10 chars."
        : value.length > 2048
        ? "Max content length is 2048 chars."
        : true;
    },
  },
  sendAt: {
    required: true,
    type: "string",
    validate: function (value: string) {
      return typeof value !== this.type
        ? `Invalid sendAt type, might be ${this.type}`
        : /^(0\d|1\d|2[0-3]):([0-5]\d)$/.test(value) || "Invalid time";
    },
  },
  needToSend: {
    required: false,
    type: "number",
    validate: function (value: number) {
      return typeof value !== this.type
        ? `Invalid needToSend type, might be ${this.type}`
        : value < 0
        ? "Min needToSend value is 0."
        : value > 365
        ? "Max needToSend value is 365."
        : true;
    },
  },
  totalSended: {
    required: false,
    type: "number",
    validate: function (value: number) {
      return typeof value !== this.type
        ? `Invalid totalSended type, might be ${this.type}`
        : value < 0
        ? "Min totalSended value is 0."
        : value > 999999
        ? "Max totalSended value is 999999."
        : true;
    },
  },
  isPaused: {
    required: false,
    type: "boolean",
    validate: function (value: boolean) {
      return typeof value !== this.type
        ? `Invalid isPaused type, might be ${this.type}`
        : true;
    },
  },
};

export default MAIL;
export { CreateMailData, UpdateMailData, MailValid };
