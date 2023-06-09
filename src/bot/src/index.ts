import LocalSession from "telegraf-session-local";
import { resolve } from "path";
import { bot } from "./bot";
import { channelMessage, start, stats } from "./handlers";

bot.use(
  new LocalSession({
    database: resolve(__dirname, "../session.json"),
  }).middleware()
);

bot.start(async (ctx) => await start(ctx));
bot.command("stats", async (ctx) => await stats(ctx));
bot.on("channel_post", async (ctx) => await channelMessage(ctx));

// bot started info
bot.telegram.getMe().then((botInfo) => {
  console.log(`Bot username is ${botInfo.username}`);
});

bot.launch();
