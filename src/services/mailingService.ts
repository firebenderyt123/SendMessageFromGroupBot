import { mailingRepository } from "../repositories/mailingRepository";
import CustomError from "../classes/customError";
import MAIL, { CreateMailData, UpdateMailData } from "../models/mail";

class MailingService {
  async createMail(data: any): Promise<MAIL> {
    const { name, image, content, sendAt, needToSend = -1 } = data;
    const mail = await mailingRepository.getOne({ name });
    if (mail) throw new CustomError("Mail with same name is exists", 400);

    const newData: CreateMailData = {
      name,
      image,
      content,
      sendAt: sendAt,
      needToSend,
      totalSended: 0,
      isPaused: true,
    };

    const createdMail: MAIL = await mailingRepository.create(newData);
    if (!createdMail) throw new CustomError("Mail not created", 400);

    return createdMail;
  }

  async updateMail(id: string, data: any): Promise<MAIL> {
    const { name, image, content, sendAt, needToSend, totalSended, isPaused } =
      data;
    const mail = await mailingRepository.getOne({ name });
    if (mail) throw new CustomError("Mail with same name is exists", 400);

    const newData: UpdateMailData = {};
    if (name !== undefined) newData.name = name;
    if (image !== undefined) newData.image = image;
    if (content !== undefined) newData.content = content;
    if (sendAt !== undefined) newData.sendAt = sendAt;
    if (needToSend !== undefined) newData.needToSend = needToSend;
    if (totalSended !== undefined) newData.totalSended = totalSended;
    if (isPaused !== undefined) newData.isPaused = isPaused;

    const updatedMail: MAIL = await mailingRepository.update(id, newData);
    if (!updatedMail) throw new CustomError("Mail not updated", 400);

    return updatedMail;
  }

  async deleteMail(id: string): Promise<MAIL> {
    const deletedMail: MAIL = await mailingRepository.delete(id);
    if (!deletedMail) throw new CustomError("Mail to delete not found", 404);
    return deletedMail;
  }

  async searchAll(): Promise<MAIL[]> {
    const allMails: MAIL[] = await mailingRepository.getAll();
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
