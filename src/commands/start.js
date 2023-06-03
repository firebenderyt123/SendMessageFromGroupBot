import { stats } from "../config";
import fs from "fs";

let postData;
fs.readFile("./data.json", "utf8", (err, data) => {
  if (err) {
    console.log("Error", err);
  }
  postData = JSON.parse(data);
});

const start = async ({ ctx, logger }) => {
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

const forwardMessage = async ({ ctx, msgId, logger }) => {
  const {
    from: { id: userId },
  } = ctx;
  try {
    stats.updateStats(userId);
    await ctx.telegram.forwardMessage(userId, process.env.CHANNEL_ID, msgId);
  } catch (error) {
    if (error.code !== 403) {
      await ctx.telegram.sendMessage(userId, `File No. ${msgId} not found :(`);
    }
    logger("Error", error);
  }
};

const sendMessage = async ({ ctx, message, logger }) => {
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
