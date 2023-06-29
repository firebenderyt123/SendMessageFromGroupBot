// import { stats } from "../config";
import fs from "fs";
import path from "path";
import { StartContext } from "../contexts/StartContext";
import { forwardMessage, sendError, sendMessage } from "../services/messages";
import { createUser, getUser } from "../services/users";
import { logger } from "../utils/logger";

let postData: any;
const dataFilePath = path.join(__dirname, "../../data.json");
fs.readFile(dataFilePath, "utf8", (err: any, data: any) => {
  if (err) {
    console.log("Error", err);
  }
  postData = JSON.parse(data);
});

async function start(ctx: StartContext): Promise<void> {
  const { from, startPayload } = ctx;

  if (!from) {
    logger("Error", "Message not sent! 'from' property is undefined");
    return;
  }

  const user = await getUser(from.id);
  if (user.error) {
    await createUser(from.id, from.first_name);
  }

  if (!startPayload) {
    await sendMessage(ctx, `Welcome to the files bot.`);
    return;
  }

  if (startPayload.startsWith("post_")) {
    const postId = startPayload.replace("post_", "");
    const postArray = postData[postId] || [];
    if (postArray.length === 0) {
      await sendMessage(ctx, `Post with No. ${postId} not found :(`);
    } else {
      for (let i = 0; i < postArray.length; i++) {
        const msgId = postArray[i];
        await forwardMessage(ctx, msgId);
      }
    }
  } else {
    await forwardMessage(ctx, +startPayload);
  }
}

export { start };
