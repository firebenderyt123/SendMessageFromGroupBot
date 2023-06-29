import { usersRepository } from "../repositories/usersRepository";
import CustomError from "../classes/customError";
import USER, {
  CreateUserData,
  SearchUserData,
  UpdateUserData,
} from "../models/user";

class UsersService {
  async createUser(data: any): Promise<USER> {
    const { id, firstName } = data;
    const user = await usersRepository.getOne({ id });
    if (user) throw new CustomError("User with same id is exists", 400);

    const newData: CreateUserData = {
      id,
      firstName,
    };

    const createdUser: USER | null = await usersRepository.create(newData);
    if (!createdUser) throw new CustomError("User not created", 400);

    return createdUser;
  }

  async updateUser(id: number, data: any): Promise<USER> {
    const { firstName } = data;

    const newData: UpdateUserData = {};
    if (firstName !== undefined) newData.firstName = firstName;

    const updatedUser: USER | null = await usersRepository.update(id, newData);
    if (!updatedUser) throw new CustomError("User not updated", 400);

    return updatedUser;
  }

  async deleteUser(id: number): Promise<USER> {
    const deletedUser: USER | null = await usersRepository.delete(id);
    if (!deletedUser) throw new CustomError("User to delete not found", 404);
    return deletedUser;
  }

  async searchAll(): Promise<USER[]> {
    const allUsers: USER[] = await usersRepository.getAll();
    return allUsers;
  }

  async search(data: SearchUserData): Promise<USER> {
    const user: USER | null = await usersRepository.getOne(data);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    return user;
  }
}

const usersService = new UsersService();

export { usersService };
