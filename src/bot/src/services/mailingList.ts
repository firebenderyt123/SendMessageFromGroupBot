import { getMailsListRequest, updateMailRequest } from "../api/mailingList";
import Response from "../classes/Response";
import MAIL, { UpdateMailData } from "../models/mail";
import { getToken } from "../utils/auth";
import { logger } from "../utils/logger";

async function getMailsList(): Promise<Response<MAIL[]>> {
  const token = getToken();
  try {
    const response = await getMailsListRequest(token);
    if (response.status === 200) {
      return new Response<MAIL[]>(response.data);
    } else {
      return new Response<MAIL[]>(null, response.data);
    }
  } catch (error: any) {
    logger("Error", error);
    return new Response<MAIL[]>(null, error);
  }
}

async function updateMail(
  id: string,
  data: UpdateMailData
): Promise<Response<MAIL[]>> {
  const token = getToken();
  try {
    const response = await updateMailRequest(token, id, data);
    if (response.status === 200) {
      return new Response<MAIL[]>(response.data);
    } else {
      return new Response<MAIL[]>(null, response.data);
    }
  } catch (error: any) {
    logger("Error", error);
    return new Response<MAIL[]>(null, error);
  }
}

export { getMailsList, updateMail };
