import { Telegraf } from "telegraf";
import LocalSession from "telegraf-session-local";

import { logger } from "./logger";
import { start, stats } from "./commands";

import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const botToken = process.env.BOT_TOKEN;
const channelId = process.env.CHANNEL_ID;

if (!botToken || !channelId) {
  throw new Error("BOT_TOKEN or CHANNEL_ID not defined");
}

const bot = new Telegraf(botToken);

bot.use(new LocalSession({ database: "./session.json" }).middleware());

bot.start(async (ctx) => await start({ ctx, logger }));
bot.command("stats", async (ctx) => await stats({ ctx, logger }));

// bot started info
bot.telegram.getMe().then((botInfo) => {
  console.log(`Bot username is ${botInfo.username}`);
});

bot.launch();
