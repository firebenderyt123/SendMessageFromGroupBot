const mainUrl = "http://localhost:8000";
const apiUrl = mainUrl + "/api";
const mailingUrl = apiUrl + "/mailing";

const defaultError = { error: true, message: "Unknown error occurred." };

export { defaultError, mainUrl, mailingUrl };
