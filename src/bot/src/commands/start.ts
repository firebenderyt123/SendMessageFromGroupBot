// import { stats } from "../config";
import fs from "fs";
import path from "path";

let postData: any;
const dataFilePath = path.join(__dirname, "../../data.json");
fs.readFile(dataFilePath, "utf8", (err: any, data: any) => {
  if (err) {
    console.log("Error", err);
  }
  postData = JSON.parse(data);
});

const start = async ({ ctx, logger }: any) => {
  const { startPayload } = ctx;

  if (startPayload.startsWith("post_")) {
    const postId = startPayload.replace("post_", "");
    const postArray = postData[postId] || [];
    if (postArray.length === 0) {
      await sendMessage({
        ctx,
        message: `Post with No. ${postId} not found :(`,
        logger,
      });
    } else {
      for (let i = 0; i < postArray.length; i++) {
        const msgId = postArray[i];
        await forwardMessage({ ctx, msgId, logger });
      }
    }
  } else {
    await forwardMessage({ ctx, msgId: startPayload, logger });
  }
};

const forwardMessage = async ({ ctx, msgId, logger }: any) => {
  const {
    from: { id: userId },
  } = ctx;
  try {
    // stats.updateStats(userId);
    await ctx.telegram.forwardMessage(userId, process.env.CHANNEL_ID, msgId);
  } catch (error: any) {
    if (error.code !== 403) {
      await ctx.telegram.sendMessage(userId, `File No. ${msgId} not found :(`);
    }
    logger("Error", error);
  }
};

const sendMessage = async ({ ctx, message, logger }: any) => {
  const {
    from: { id: userId },
  } = ctx;
  try {
    await ctx.telegram.sendMessage(userId, message);
  } catch (error) {
    logger("Error", error);
  }
};

export { start };
