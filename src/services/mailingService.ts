import { mailingRepository } from "../repositories/mailingRepository";
import CustomError from "../classes/customError";
import MAIL from "../models/mail";

class MailingService {
  async createMail(data: any): Promise<MAIL> {
    const { name, image, content, needToSend = -1 } = data;
    const mail = await mailingRepository.getOne({ name });
    if (mail) throw new CustomError("Mail with same name is exists", 400);

    const createdMail = await mailingRepository.create({
      name,
      image,
      content,
      needToSend,
    });
    if (!createdMail) throw new CustomError("Mail not created", 400);

    return createdMail;
  }

  // async updateMail(id, data) {}

  // async deleteMail(id) {}

  async searchAll(): Promise<MAIL[]> {
    const allMails = await mailingRepository.getAll();
    return allMails;
  }

  async search(data: any): Promise<MAIL> {
    const mail = await mailingRepository.getOne(data);
    if (!mail) {
      throw new CustomError("Mail not found", 400);
    }
    return mail;
  }
}

const mailingService = new MailingService();

export { mailingService };
