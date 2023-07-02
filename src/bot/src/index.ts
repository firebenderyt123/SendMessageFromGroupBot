import { Telegraf } from "telegraf";
import LocalSession from "telegraf-session-local";
import { resolve } from "path";
import dotenv from "dotenv";
import { start, stats } from "./commands";
import { startSchedule } from "./utils/sheduler";

dotenv.config({ path: resolve(__dirname, "../.env") });

const botToken = process.env.BOT_TOKEN;
const channelId = process.env.CHANNEL_ID;

if (!botToken || !channelId) {
  throw new Error("BOT_TOKEN or CHANNEL_ID not defined");
}

const bot = new Telegraf(botToken);

bot.use(
  new LocalSession({
    database: resolve(__dirname, "../session.json"),
  }).middleware()
);

bot.start(async (ctx) => await start(ctx));
bot.command("stats", async (ctx) => await stats(ctx));

// bot started info
bot.telegram.getMe().then((botInfo) => {
  console.log(`Bot username is ${botInfo.username}`);
  startSchedule(bot);
});

bot.launch();
