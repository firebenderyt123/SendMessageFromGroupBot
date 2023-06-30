import { Context } from "telegraf";
import { getFileHistoryStats } from "../services/history";
import { sendMessage } from "../utils/messages";

async function stats(ctx: Context): Promise<void> {
  const { data, error } = await getFileHistoryStats();

  if (error || !data?.daysAgo) {
    await sendMessage(ctx, "Something went wrong!");
    return;
  }

  const {
    "1": day,
    "3": threeDays,
    "7": week,
    "28": month,
    "182": sixMonths,
    "365": year,
  } = data?.daysAgo;

  const statsMessage =
    `Stats for all users:
    ` +
    `Today: ${day.length} requests
    ` +
    `Three days: ${threeDays.length} requests
    ` +
    `This week: ${week.length} requests
    ` +
    `This month: ${month.length} requests
    ` +
    `Half year: ${sixMonths.length} requests
    ` +
    `This year: ${year.length} requests`;
  await sendMessage(ctx, statsMessage);
}

export { stats };
