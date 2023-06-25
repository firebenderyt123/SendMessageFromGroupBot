import { BaseRepository } from "./baseRepository";

class MailingRepository extends BaseRepository {
  constructor() {
    super("mails");
  }
}

const mailingRepository = new MailingRepository();

export { mailingRepository };
