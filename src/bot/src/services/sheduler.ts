import schedule from "node-schedule";
import { getMailsList } from "./mailingList";
import { sendMessage } from "./messages";
import { getUsers } from "./users";
import MAIL from "../models/mail";

const INTERVAL = 24 * 60 * 60 * 1000; // 24 hours

const startSchedule = () => {
  setInterval(scheduleTasks, INTERVAL);
};

async function scheduleTasks() {
  const usersResp = await getUsers();
  const mailsListResp = await getMailsList();
  if (!mailsListResp.data || !usersResp.data) return;

  mailsListResp.data.forEach((mail: MAIL) => {
    const scheduledTime = new Date(mail.sendAt); // Use the sendAt property from the mail item
    schedule.scheduleJob(scheduledTime, async function () {
      const message = "This is a scheduled message!";
      //   users.forEach();
      //   await sendMessage(mail.userId, message); // Assuming you have a valid userId property in the mail item
    });
  });
}

export { startSchedule };
