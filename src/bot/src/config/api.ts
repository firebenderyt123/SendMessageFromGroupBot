import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../../.env") });

const SERVER_URL = process.env.SERVER_URL;

const apiRoot = `${SERVER_URL}/api`;
const historyUrl = apiRoot + "/history";
const mailingUrl = apiRoot + "/mailing";
const usersUrl = apiRoot + "/users";
const fileStatsUrl = apiRoot + "/stats/files";

const defaultError = { error: true, message: "Unknown error occurred." };

export { defaultError, fileStatsUrl, historyUrl, mailingUrl, usersUrl };
