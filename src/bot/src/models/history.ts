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

type FileHistoryStats = {
  daysAgo: {
    "1": Date[];
    "3": Date[];
    "7": Date[];
    "28": Date[];
    "182": Date[];
    "365": Date[];
  };
};

export default FILE_HISTORY;
export { CreateFileHistoryData, FileHistoryStats };
