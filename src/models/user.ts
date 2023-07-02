interface USER {
  id: number;
  firstName: string;
}

type CreateUserData = {
  id: number;
  firstName: string;
};

type SearchUserData = {
  id: number;
};

type UpdateUserData = {
  firstName?: string;
};

const UserValid = {
  id: {
    required: true,
    type: "number",
    validate: function (value: string) {
      return typeof value !== this.type
        ? `Invalid name type, might be ${this.type}`
        : true;
    },
  },
  firstName: {
    required: true,
    type: "string",
    validate: function (value: string) {
      return typeof value !== this.type
        ? `Invalid name type, might be ${this.type}`
        : value.length < 1
        ? "Min name length is 1 chars."
        : value.length > 120
        ? "Max name length is 120 chars."
        : true;
    },
  },
};

export default USER;
export { CreateUserData, SearchUserData, UpdateUserData, UserValid };
