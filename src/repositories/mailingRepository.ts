import { BaseRepository } from "./baseRepository";
import MAIL, { CreateMailData } from "../models/mail";

class MailingRepository extends BaseRepository {
  constructor() {
    super("mails");
  }

  async create(data: CreateMailData): Promise<any> {
    const { name, image, content, needToSend } = data;
    try {
      const collectionData = await this.dbContext.getData(
        `/${this.collectionName}`
      );
      const mailData: MAIL = {
        id: this.generateId(),
        name,
        image,
        content,
        needToSend,
        totalSended: 0,
        isPaused: true,
        createdAt: new Date(),
        updatedAt: new Date(),
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
