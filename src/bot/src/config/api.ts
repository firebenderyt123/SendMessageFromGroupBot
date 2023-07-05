import { SERVER_URL } from "./env";

const apiRoot = `${SERVER_URL}/api`;
const historyUrl = apiRoot + "/history";
const usersUrl = apiRoot + "/users";
const fileStatsUrl = apiRoot + "/stats/files";

export { fileStatsUrl, historyUrl, usersUrl };
