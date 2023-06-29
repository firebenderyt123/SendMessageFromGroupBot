const mainUrl = "http://localhost:8000";
const apiUrl = mainUrl + "/api";
const historyUrl = apiUrl + "/history";
const mailingUrl = apiUrl + "/mailing";
const usersUrl = apiUrl + "/users";

const defaultError = { error: true, message: "Unknown error occurred." };

export { defaultError, historyUrl, mailingUrl, mainUrl, usersUrl };
