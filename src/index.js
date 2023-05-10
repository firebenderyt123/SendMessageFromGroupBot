const { Telegraf } = require("telegraf");
const { logError } = require("./logger");
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const botToken = process.env.BOT_TOKEN;
const channelId = process.env.CHANNEL_ID;

if (!botToken || !channelId) {
  throw new Error("BOT_TOKEN or CHANNEL_ID not defined");
}

const bot = new Telegraf(botToken);

bot.telegram.getMe().then((botInfo) => {
  console.log(`Bot username is ${botInfo.username}`);
});

bot.start(async (ctx) => {
  const payload = ctx.startPayload;
  const userId = ctx.from.id;

  try {
    await ctx.telegram.forwardMessage(userId, channelId, payload);
  } catch (error) {
    await ctx.telegram.sendMessage(userId, "Файл не найден :(");
    logError(error);
  }
});

bot.launch();
