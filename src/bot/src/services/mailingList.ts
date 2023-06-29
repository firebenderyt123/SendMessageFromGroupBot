import { getMailsListRequest } from "../api/mailingList";

async function getMailsList(): Promise<any> {
  return await getMailsListRequest("12");
}

export { getMailsList };
