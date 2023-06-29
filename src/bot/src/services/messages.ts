import { Context } from "telegraf";
import { logger } from "../utils/logger";

const CHANNEL_ID = process.env.CHANNEL_ID as string;

async function sendMessage(ctx: Context, message: string): Promise<void> {
  const { from, telegram } = ctx;

  if (!from) {
    logger("Error", "Message not sent! 'from' property is undefined");
    return;
  }

  try {
    await telegram.sendMessage(from.id, message);
  } catch (error: any) {
    logger("Error", error);
  }
}

async function forwardMessage(ctx: Context, msgId: number): Promise<void> {
  const { from } = ctx;

  if (!from) {
    logger("Error", "Message not sent! 'from' property is undefined");
    return;
  }

  try {
    // stats.updateStats(userId);
    await ctx.telegram.forwardMessage(from.id, CHANNEL_ID, msgId);
  } catch (error: any) {
    if (error.code !== 403) {
      await ctx.telegram.sendMessage(from.id, `File No. ${msgId} not found :(`);
    }
    logger("Error", error);
  }
}

export { sendMessage, forwardMessage };
