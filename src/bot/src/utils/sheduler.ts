import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import dotenv from "dotenv";
import { resolve } from "path";
import { sendImage, sendMessage } from "./messages";
import { getMailsList, updateMail } from "../services/mailingList";
import { getUsers } from "../services/users";
import MAIL from "../models/mail";

dotenv.config({ path: resolve(__dirname, "../../.env") });

// const INTERVAL = 60 * 1000; // 1 minute
const INTERVAL = 10 * 1000;
const SERVER_URL = process.env.SERVER_URL;

const startSchedule = (bot: Telegraf<Context<Update>>) => {
  setInterval(() => scheduleTasks(bot), INTERVAL);
};

async function scheduleTasks(bot: Telegraf<Context<Update>>) {
  const usersResp = await getUsers();
  const mailsListResp = await getMailsList();
  if (!mailsListResp.data || !usersResp.data) return;

  mailsListResp.data.forEach(async (mail: MAIL) => {
    const {
      id: mailId,
      content,
      image,
      sendAt,
      needToSend,
      totalSended,
      isPaused,
    } = mail;
    if (isPaused || (needToSend !== 0 && needToSend >= totalSended)) return;

    const currentTime = new Date();

    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    const targetTimeParts = sendAt.split(":");
    const targetHours = parseInt(targetTimeParts[0]);
    const targetMinutes = parseInt(targetTimeParts[1]);

    const isTimeMatches =
      currentHours === targetHours && currentMinutes === targetMinutes;

    if (isTimeMatches) {
      usersResp.data?.forEach(async (user) => {
        const { id } = user;
        if (!image && content) {
          bot.telegram.sendMessage;
          await sendMessage(bot.telegram, id, content, {
            parse_mode: "HTML",
          });
        } else if (image) {
          await sendImage(bot.telegram, id, `${SERVER_URL}/${image}`, {
            caption: content,
            parse_mode: "HTML",
          });
        }
      });
      await updateMail(mailId, { totalSended: totalSended + 1 });
    }
  });
}

export { startSchedule };
