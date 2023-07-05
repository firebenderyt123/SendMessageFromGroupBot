import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../../.env") });

const ADMIN_IDS = (process.env.ADMIN_IDS as string)
  .split(",")
  .map((adminId) => Number(adminId));
const BOT_TOKEN = process.env.BOT_TOKEN as string;
const CHANNEL_ID = Number(process.env.CHANNEL_ID);
const MAILING_CHANNEL_ID = Number(process.env.MAILING_CHANNEL_ID);
const SERVER_URL = process.env.SERVER_URL as string;

export { ADMIN_IDS, BOT_TOKEN, CHANNEL_ID, MAILING_CHANNEL_ID, SERVER_URL };
