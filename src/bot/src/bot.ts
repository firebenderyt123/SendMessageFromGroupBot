import { Telegraf } from "telegraf";
import { BOT_TOKEN, CHANNEL_ID } from "./config/env";

if (!BOT_TOKEN || !CHANNEL_ID) {
  throw new Error("BOT_TOKEN or CHANNEL_ID not defined");
}

const bot = new Telegraf(BOT_TOKEN);

export { bot };
