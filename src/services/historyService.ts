import { historyRepository } from "../repositories/historyRepository";
import CustomError from "../classes/customError";
import FileHistory, {
  CreateFileHistoryData,
  FileHistoryStats,
  SearchFileHistoryData,
} from "../models/history";
import FILE_HISTORY from "../models/history";

class FileHistoryService {
  async createFileHistory(data: any): Promise<FileHistory> {
    const { postId, fileIds } = data;

    const newData: CreateFileHistoryData = {
      postId,
      fileIds,
      date: new Date(),
    };

    const createdFileHistory: FileHistory | null =
      await historyRepository.create(newData);
    if (!createdFileHistory)
      throw new CustomError("FileHistory not created", 400);

    return createdFileHistory;
  }

  async deleteFileHistory(id: string): Promise<FileHistory> {
    const deletedFileHistory: FileHistory | null =
      await historyRepository.delete(id);
    if (!deletedFileHistory)
      throw new CustomError("FileHistory to delete not found", 404);
    return deletedFileHistory;
  }

  async searchAll(): Promise<FileHistory[]> {
    const allFilesHistory: FileHistory[] = await historyRepository.getAll();
    return allFilesHistory;
  }

  async search(data: SearchFileHistoryData): Promise<FileHistory> {
    const fileHistory: FileHistory | null = await historyRepository.getOne(
      data
    );
    if (!fileHistory) {
      throw new CustomError("FileHistory not found", 404);
    }
    return fileHistory;
  }

  async stats(): Promise<FileHistoryStats> {
    const allFilesHistory: FILE_HISTORY[] = await historyRepository.getAll();
    const currentDate = new Date();

    const oneDayAgo = new Date();
    oneDayAgo.setDate(currentDate.getDate() - 1);

    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(currentDate.getDate() - 3);

    const weekAgo = new Date();
    weekAgo.setDate(currentDate.getDate() - 7);

    const monthAgo = new Date();
    monthAgo.setDate(currentDate.getDate() - 28);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setDate(currentDate.getDate() - 182);

    const yearAgo = new Date();
    yearAgo.setDate(currentDate.getDate() - 365);

    const getFilesHistory = (someDaysAgo: Date) =>
      allFilesHistory
        .filter((file) => file.date >= someDaysAgo && file.date <= currentDate)
        .map((file) => file.date);

    const one = getFilesHistory(oneDayAgo);
    const three = getFilesHistory(threeDaysAgo);
    const seven = getFilesHistory(weekAgo);
    const month = getFilesHistory(monthAgo);
    const halfYear = getFilesHistory(sixMonthsAgo);
    const year = getFilesHistory(yearAgo);

    const stats: FileHistoryStats = {
      daysAgo: {
        "1": one,
        "3": three,
        "7": seven,
        "28": month,
        "182": halfYear,
        "365": year,
      },
    };

    return stats;
  }
}

const fileHistoryService = new FileHistoryService();

export { fileHistoryService };
