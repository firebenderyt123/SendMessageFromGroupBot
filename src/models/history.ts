interface FILE_HISTORY {
  id: string;
  postId: number; // post Id
  fileIds: number[]; // forward messages Ids
  date: Date;
}

type CreateFileHistoryData = {
  postId: number;
  fileIds: number[];
  date: Date;
};

type SearchFileHistoryData = {
  id: string;
};

const FileHistoryValid = {
  postId: {
    required: true,
    type: "number",
    validate: function (value: number) {
      return typeof value !== this.type
        ? `Invalid postId type, might be ${this.type}`
        : true;
    },
  },
  fileIds: {
    required: true,
    type: "number",
    validate: function (value: number[]) {
      return !Array.isArray(value)
        ? `Invalid fileId type, might be array`
        : value.length < 0
        ? "Might be some file ids"
        : value.length > 10
        ? "Max 10 file ids"
        : !!value.filter((item) => (typeof item !== this.type ? true : false))
            .length
        ? "All items might be numbers"
        : true;
    },
  },
};

export default FILE_HISTORY;
export { CreateFileHistoryData, SearchFileHistoryData, FileHistoryValid };
