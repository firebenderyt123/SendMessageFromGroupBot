import { mailingRepository } from "../repositories/mailingRepository";
import CustomError from "../classes/customError";

class MailingService {
  // createMail(data) {}

  // updateMail(id, data) {}

  // deleteMail(id) {}

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
