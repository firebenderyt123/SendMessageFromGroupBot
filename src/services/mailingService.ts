import { mailingRepository } from "../repositories/mailingRepository";
import CustomError from "../classes/customError";
import MAIL, { CreateMailData, UpdateMailData } from "../models/mail";

class MailingService {
  async createMail(data: any): Promise<MAIL> {
    const { name, content, sendAt, needToSend = 0 } = data;

    const newData: CreateMailData = {
      name,
      content,
      sendAt: sendAt,
      needToSend,
      totalSended: 0,
      isPaused: true,
    };

    const createdMail: MAIL | null = await mailingRepository.create(newData);
    if (!createdMail) throw new CustomError("Mail not created", 400);

    return createdMail;
  }

  async updateMail(id: string, data: any): Promise<MAIL> {
    const { name, content, sendAt, needToSend, totalSended, isPaused } = data;

    const newData: UpdateMailData = {};
    if (name !== undefined) newData.name = name;
    if (content !== undefined) newData.content = content;
    if (sendAt !== undefined) newData.sendAt = sendAt;
    if (needToSend !== undefined) newData.needToSend = needToSend;
    if (totalSended !== undefined) newData.totalSended = totalSended;
    if (isPaused !== undefined) newData.isPaused = isPaused;

    const updatedMail: MAIL | null = await mailingRepository.update(
      id,
      newData
    );
    if (!updatedMail) throw new CustomError("Mail not updated", 400);

    return updatedMail;
  }

  async deleteMail(id: string): Promise<MAIL> {
    const deletedMail: MAIL | null = await mailingRepository.delete(id);
    if (!deletedMail) throw new CustomError("Mail to delete not found", 404);
    return deletedMail;
  }

  async uploadImage(id: string, image: Express.Multer.File): Promise<MAIL> {
    const mail = await mailingRepository.getOne({ id });
    if (mail.image) await mailingRepository.deleteImage(id);
    const updatedMail: MAIL | null = await mailingRepository.uploadImage(
      id,
      image.path.replace("\\", "/")
    );
    if (!updatedMail) throw new CustomError("Mail image not uploaded", 400);
    return updatedMail;
  }

  async deleteImage(id: string): Promise<MAIL> {
    const mail = await mailingRepository.getOne({ id });
    if (!mail.image) throw new CustomError("No mail image to delete", 400);
    const updatedMail: MAIL | null = await mailingRepository.deleteImage(id);
    if (!updatedMail) throw new CustomError("Mail image not deleted", 400);
    return updatedMail;
  }

  async searchAll(): Promise<MAIL[]> {
    const allMails: MAIL[] = await mailingRepository.getAll();
    return allMails;
  }

  async search(data: any): Promise<MAIL> {
    const mail: MAIL | null = await mailingRepository.getOne(data);
    if (!mail) {
      throw new CustomError("Mail not found", 404);
    }
    return mail;
  }
}

const mailingService = new MailingService();

export { mailingService };
