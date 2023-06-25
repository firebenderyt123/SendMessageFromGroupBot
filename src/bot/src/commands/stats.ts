// import { stats as s } from "../config";

// const statsRegex = /^\/stats(\s+)(.*)?$/i;

// const getStatsParam = (text: string) => {
//   const match = text.match(statsRegex);
//   return match ? match[2] : null;
// };

// const stats = async ({ ctx, logger }: any) => {
//   const text = ctx.message.text;
//   const param = getStatsParam(text);

//   if (param === "save") {
//     s.saveStats();
//     return await ctx.reply("Stats saved successfully!");
//   }

//   const { day, week, month, year, allTime }: any = s.getStats();
//   await ctx.reply(
//     `Stats for all users:\n
//   ` +
//       `Today: ${day} messages
//   ` +
//       `This week: ${week} messages
//   ` +
//       `This month: ${month} messages
//   ` +
//       `This year: ${year} messages
//   ` +
//       `All time: ${allTime} messages`
//   );
// };

// export { stats };
