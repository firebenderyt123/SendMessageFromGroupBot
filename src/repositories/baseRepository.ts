import db from "../config/db";
import { v4 as uuidv4 } from "uuid";

class BaseRepository {
  dbContext: any;
  collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    this.dbContext = db;
  }

  generateId(): string {
    return uuidv4();
  }

  async getAll(): Promise<any[]> {
    try {
      console.log(await this.dbContext.getData(`/${this.collectionName}`));
      return await this.dbContext.getData(`/${this.collectionName}`);
    } catch (error) {
      return [];
    }
  }

  async getOne(search: any): Promise<any> {
    try {
      const collectionData = await this.dbContext.getData(
        `/${this.collectionName}`
      );
      return collectionData.find((item: any) => {
        for (const key in search) {
          if (item[key] !== search[key]) {
            return false;
          }
        }
        return true;
      });
    } catch (error) {
      return null;
    }
  }

  async create(data: any): Promise<any> {
    try {
      const collectionData = await this.dbContext.getData(
        `/${this.collectionName}`
      );
      data.id = this.generateId();
      data.createdAt = new Date();
      collectionData.push(data);
      this.dbContext.save();
      return data;
    } catch (error) {
      return null;
    }
  }

  async update(id: string, dataToUpdate: any): Promise<any> {
    try {
      const collectionData = await this.dbContext.getData(
        `/${this.collectionName}`
      );
      const itemToUpdate = collectionData.find((item: any) => item.id === id);
      if (itemToUpdate) {
        dataToUpdate.updatedAt = new Date();
        Object.assign(itemToUpdate, dataToUpdate);
        this.dbContext.save();
        return itemToUpdate;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const collectionData = await this.dbContext.getData(
        `/${this.collectionName}`
      );
      const itemToDelete = collectionData.find((item: any) => item.id === id);
      if (itemToDelete) {
        collectionData.splice(collectionData.indexOf(itemToDelete), 1);
        this.dbContext.save();
        return itemToDelete;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}

export { BaseRepository };