const apiRoot = "http://localhost:8000/api";
const historyUrl = apiRoot + "/history";
const mailingUrl = apiRoot + "/mailing";
const usersUrl = apiRoot + "/users";
const fileStatsUrl = apiRoot + "/stats/files";

const defaultError = { error: true, message: "Unknown error occurred." };

export { defaultError, fileStatsUrl, historyUrl, mailingUrl, usersUrl };
