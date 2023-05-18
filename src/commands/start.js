import { stats } from "../config";

const start = async ({ ctx, logger }) => {
  const {
    startPayload,
    from: { id: userId },
  } = ctx;

  try {
    stats.updateStats(userId);
    await ctx.telegram.forwardMessage(
      userId,
      process.env.CHANNEL_ID,
      startPayload
    );
  } catch (error) {
    await ctx.telegram.sendMessage(userId, "File not found :(");
    logger("Error", error);
  }
};

export { start };
