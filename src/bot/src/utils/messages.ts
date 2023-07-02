import { Telegram } from "telegraf";
import { InputFile, ParseMode } from "telegraf/typings/core/types/typegram";
import { resolve } from "path";
import dotenv from "dotenv";
import { logger } from "./logger";

dotenv.config({ path: resolve(__dirname, "../.env") });
const CHANNEL_ID = process.env.CHANNEL_ID as string;

async function forwardMessage(
  telegram: Telegram,
  id: number | string,
  msgId: number
): Promise<void> {
  try {
    await telegram.forwardMessage(id, CHANNEL_ID, msgId);
  } catch (error: any) {
    logger("Error", error);
  }
}

async function sendImage(
  telegram: Telegram,
  id: number | string,
  photo: string | InputFile,
  extra?: {
    caption?: string;
    parse_mode?: ParseMode;
  }
): Promise<void> {
  try {
    await telegram.sendPhoto(id, photo, { ...extra });
  } catch (error: any) {
    console.error("Error:", error);
  }
}

async function sendMessage(
  telegram: Telegram,
  id: number | string,
  message: string,
  extra?: {
    parse_mode?: ParseMode;
  }
): Promise<void> {
  try {
    await telegram.sendMessage(id, message, { ...extra });
  } catch (error: any) {
    logger("Error", error);
  }
}

export { forwardMessage, sendImage, sendMessage };
