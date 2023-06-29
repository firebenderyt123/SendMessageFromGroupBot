import { historyRepository } from "../repositories/historyRepository";
import CustomError from "../classes/customError";
import FileHistory, {
  CreateFileHistoryData,
  SearchFileHistoryData,
} from "../models/history";

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
    const allFileHistorys: FileHistory[] = await historyRepository.getAll();
    return allFileHistorys;
  }

  async search(data: SearchFileHistoryData): Promise<FileHistory> {
    const FileHistory: FileHistory | null = await historyRepository.getOne(
      data
    );
    if (!FileHistory) {
      throw new CustomError("FileHistory not found", 404);
    }
    return FileHistory;
  }
}

const fileHistoryService = new FileHistoryService();

export { fileHistoryService };
