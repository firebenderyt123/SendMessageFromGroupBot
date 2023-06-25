import { BaseRepository } from "./baseRepository";
import MAIL, { createMailData } from "../models/mail";

class MailingRepository extends BaseRepository {
  constructor() {
    super("mails");
  }

  async create(data: createMailData): Promise<any> {
    try {
      console.log(data, `/${this.collectionName}`);
      const collectionData = await this.dbContext.getData(
        `/${this.collectionName}`
      );
      const mailData: MAIL = {
        ...data,
        id: this.generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
        totalSended: 0,
        isPaused: true,
      };

      collectionData.push(mailData);
      this.dbContext.save();
      return mailData;
    } catch (error) {
      return null;
    }
  }
}

const mailingRepository = new MailingRepository();

export { mailingRepository };
