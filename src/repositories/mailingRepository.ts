import { unlink } from "fs";
import { BaseRepository } from "./baseRepository";
import MAIL from "../models/mail";

class MailingRepository extends BaseRepository {
  constructor() {
    super("mails");
  }

  async uploadImage(id: string, image: string): Promise<MAIL | null> {
    try {
      const collectionData = await this.dbContext.getData(
        `/${this.collectionName}`
      );
      const itemToUpdate = collectionData.find((item: any) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.image = image;
        await this.dbContext.save();
        return itemToUpdate;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async deleteImage(id: string): Promise<MAIL | null> {
    try {
      const collectionData = await this.dbContext.getData(
        `/${this.collectionName}`
      );
      const itemToUpdate = collectionData.find((item: any) => item.id === id);
      if (itemToUpdate) {
        unlink(itemToUpdate.image, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          }
        });
        itemToUpdate.image = undefined;
        await this.dbContext.save();
        return itemToUpdate;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}

const mailingRepository = new MailingRepository();

export { mailingRepository };
