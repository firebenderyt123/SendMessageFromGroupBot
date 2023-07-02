import axios, { AxiosResponse } from "axios";
import { defaultError, mailingUrl } from "../config/api";
import { UpdateMailData } from "../models/mail";

async function getMailsListRequest(token: string): Promise<AxiosResponse> {
  try {
    const response = await axios.get(mailingUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    return error?.response || defaultError;
  }
}

async function updateMailRequest(
  token: string,
  id: string,
  data: UpdateMailData
): Promise<AxiosResponse> {
  try {
    const response = await axios.put(`${mailingUrl}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    return error?.response || defaultError;
  }
}

export { getMailsListRequest, updateMailRequest };
