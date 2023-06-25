import { BaseRepository } from "./baseRepository";
import MAIL, { CreateMailData } from "../models/mail";

class MailingRepository extends BaseRepository {
  constructor() {
    super("mails");
  }

  async create(data: CreateMailData): Promise<any> {
    try {
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
