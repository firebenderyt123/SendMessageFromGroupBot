// import { stats } from "../config";
import fs from "fs";
import path from "path";
import { StartContext } from "../contexts/StartContext";
import { createFileHistory } from "../services/history";
import { createUser, getUser } from "../services/users";
import { logger } from "../utils/logger";
import { forwardMessage, sendMessage } from "../utils/messages";

let postData: any;
const dataFilePath = path.join(__dirname, "../../data.json");
fs.readFile(dataFilePath, "utf8", (err: any, data: any) => {
  if (err) {
    console.log("Error", err);
  }
  postData = JSON.parse(data);
});

async function start(ctx: StartContext): Promise<void> {
  const { telegram, from, startPayload } = ctx;

  if (!from) {
    logger("Error", "Message not sent! 'from' property is undefined");
    return;
  }

  // Add user to database if he's not there
  const user = await getUser(from.id);
  if (user.error) {
    await createUser(from.id, from.first_name);
  }

  // Message if no payload
  if (!startPayload) {
    await sendMessage(telegram, from.id, `Welcome to the files bot.`);
    return;
  }

  // if command like /start?post_${data}
  if (startPayload.startsWith("post_")) {
    const postId = +startPayload.replace("post_", "");
    if (!postId) {
      await sendMessage(telegram, from.id, `Invalid post id :(`);
      return;
    }

    const fileIds: string[] = postData[postId] || [];

    if (!fileIds.length || fileIds[0] === "error") {
      await sendMessage(
        telegram,
        from.id,
        `Post with No. ${postId} not found :(`
      );
    } else {
      const numbericFileIds = fileIds.map((fileId: string) => +fileId);
      numbericFileIds.forEach(async (msgId) => {
        await forwardMessage(telegram, from.id, msgId);
      });
      await createFileHistory(postId, numbericFileIds);
    }
  }
}

export { start };
