import { mailingRepository } from "../repositories/mailingRepository";
import CustomError from "../classes/customError";
import { createMailData } from "../models/mail";

class MailingService {
  async createMail(data: createMailData) {
    const { name, image, content, needToSend } = data;
    const createdMail = await mailingRepository.create({
      name,
      image,
      content,
      needToSend,
    });
    if (!createdMail) {
      throw new CustomError("Mail not created", 400);
    }
    return createdMail;
  }

  // async updateMail(id, data) {}

  // async deleteMail(id) {}

  async searchAll() {
    const allMails = await mailingRepository.getAll();
    return allMails;
  }

  async search(data: any) {
    const mail = await mailingRepository.getOne(data);
    if (!mail) {
      throw new CustomError("Mail not found", 400);
    }
    return mail;
  }
}

const mailingService = new MailingService();

export { mailingService };
