// import { stats } from "../config";
import fs from "fs";
import path from "path";
import { StartContext } from "../contexts/StartContext";
import { sendMessage, forwardMessage } from "../services/messages";

let postData: any;
const dataFilePath = path.join(__dirname, "../../data.json");
fs.readFile(dataFilePath, "utf8", (err: any, data: any) => {
  if (err) {
    console.log("Error", err);
  }
  postData = JSON.parse(data);
});

async function start(ctx: StartContext): Promise<void> {
  const { startPayload } = ctx;

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
