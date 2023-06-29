import { BaseRepository } from "./baseRepository";

class HistoryRepository extends BaseRepository {
  constructor() {
    super("history/files");
  }
}

const historyRepository = new HistoryRepository();

export { historyRepository };
