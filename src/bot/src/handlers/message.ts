import { Context } from "telegraf";
import { ADMIN_IDS, MAILING_CHANNEL_ID } from "../config/env";
import { getUsers } from "../services/users";
import { logger } from "../utils/logger";
import { forwardMessage, sendMessage } from "../utils/messages";

async function channelMessage(ctx: Context): Promise<void> {
  const { channelPost } = ctx;

  if (!channelPost) {
    logger("Error", "Message not sent! It's not a channel");
    return;
  }

  const { chat } = channelPost;

  if (chat.id === MAILING_CHANNEL_ID) {
    const { data: usersData, error: usersError } = await getUsers();

    if (usersError || !usersData) {
      await sendMessage(chat.id, usersError as string);
      return;
    }

    var sendingSuccess = 0;
    var sendingErrors = 0;
    // mailing subscribers
    for (const user of usersData) {
      const error = await forwardMessage(
        user.id,
        MAILING_CHANNEL_ID,
        channelPost.message_id
      );
      if (error) sendingErrors++;
      else sendingSuccess++;
    }

    // Admins notification
    const textForAdmins =
      `Success: ${sendingSuccess}\n` + `Errors: ${sendingErrors}`;
    ADMIN_IDS.forEach(async (adminId) => {
      await sendMessage(adminId, textForAdmins);
    });
  }
}

export { channelMessage };
