interface FILE_HISTORY {
  id: string;
  postId: number; // post Id
  fileIds: number[]; // forward messages Ids
  date: Date;
}

type CreateFileHistoryData = {
  postId: number;
  fileIds: number[];
};

export default FILE_HISTORY;
export { CreateFileHistoryData };
