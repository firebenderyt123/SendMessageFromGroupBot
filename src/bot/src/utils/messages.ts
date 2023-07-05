import { bot } from "../bot";
import { ParseMode } from "telegraf/typings/core/types/typegram";
import { logger } from "./logger";

async function forwardMessage(
  chatId: number | string,
  fromId: number | string,
  msgId: number
): Promise<void | Error> {
  try {
    await bot.telegram.forwardMessage(chatId, fromId, msgId);
  } catch (error: any) {
    logger("Error", error);
    return error;
  }
}

async function sendMessage(
  chatId: number | string,
  message: string,
  extra?: {
    parse_mode?: ParseMode;
  }
): Promise<void | Error> {
  try {
    await bot.telegram.sendMessage(chatId, message, { ...extra });
  } catch (error: any) {
    logger("Error", error);
    return error;
  }
}

export { forwardMessage, sendMessage };
