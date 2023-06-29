import { BaseRepository } from "./baseRepository";
import USER, { CreateUserData, UpdateUserData } from "../models/user";

class UsersRepository extends BaseRepository {
  constructor() {
    super("users");
  }

  async create(data: CreateUserData): Promise<USER | null> {
    try {
      const collectionData = await this.dbContext.getData(
        `/${this.collectionName}`
      );
      collectionData.push(data);
      await this.dbContext.save();
      return data;
    } catch (error) {
      return null;
    }
  }
}

const usersRepository = new UsersRepository();

export { usersRepository };
