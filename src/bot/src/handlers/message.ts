import { Context } from "telegraf";
import { ADMIN_IDS, MAILING_CHANNEL_ID } from "../config/env";
import { getUsers } from "../services/users";
import { logger } from "../utils/logger";
import { forwardMessage, sendMessage } from "../utils/messages";

async function groupMessage(ctx: Context): Promise<void> {
  const { message: msg, from } = ctx;

  if (!from) {
    logger("Error", "Message not sent! 'from' property is undefined");
    return;
  }

  if (msg?.chat.id === MAILING_CHANNEL_ID) {
    const { data: usersData, error: usersError } = await getUsers();

    if (usersError || !usersData) {
      await sendMessage(from.id, usersError as string);
      return;
    }

    var sendingSuccess = 0;
    var sendingErrors = 0;
    // mailing subscribers
    for (const user of usersData) {
      const error = await forwardMessage(
        user.id,
        MAILING_CHANNEL_ID,
        msg.message_id
      );
      if (error) sendingErrors++;
      else sendingSuccess++;
    }

    // Admins notification
    const textForAdmins =
      `Success quantity: ${sendingSuccess}\n` +
      `Errors quantity: ${sendingErrors}`;
    ADMIN_IDS.forEach(async (adminId) => {
      await sendMessage(adminId, textForAdmins);
    });
  }
}

export { groupMessage };
