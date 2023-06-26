import { mailingRepository } from "../repositories/mailingRepository";
import CustomError from "../classes/customError";
import MAIL, { UpdateMailData } from "../models/mail";

class MailingService {
  async createMail(data: any): Promise<MAIL> {
    const { name, image, content, needToSend = -1 } = data;
    const mail = await mailingRepository.getOne({ name });
    if (mail) throw new CustomError("Mail with same name is exists", 400);

    const createdMail: MAIL = await mailingRepository.create({
      name,
      image,
      content,
      needToSend,
    });
    if (!createdMail) throw new CustomError("Mail not created", 400);

    return createdMail;
  }

  async updateMail(id: string, data: any): Promise<MAIL> {
    const { name, image, content, needToSend } = data;
    const mail = await mailingRepository.getOne({ name });
    if (mail) throw new CustomError("Mail with same name is exists", 400);

    const newData: UpdateMailData = {};
    if (name) newData.name = name;
    if (image) newData.image = image;
    if (content) newData.content = content;
    if (needToSend) newData.needToSend = needToSend;

    const updatedMail: MAIL = await mailingRepository.update(id, newData);
    if (!updatedMail) throw new CustomError("Mail not updated", 400);

    return updatedMail;
  }

  async deleteMail(id: string): Promise<MAIL> {
    const deletedMail: MAIL = await mailingRepository.delete(id);
    if (!deletedMail) throw new CustomError("Mail not deleted", 404);
    return deletedMail;
  }

  async searchAll(): Promise<MAIL[]> {
    const allMails: MAIL[] = await mailingRepository.getAll();
    if (!allMails.length) {
      throw new CustomError("Mails not found", 404);
    }
    return allMails;
  }

  async search(data: any): Promise<MAIL> {
    const mail: MAIL = await mailingRepository.getOne(data);
    if (!mail) {
      throw new CustomError("Mail not found", 404);
    }
    return mail;
  }
}

const mailingService = new MailingService();

export { mailingService };
