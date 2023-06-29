import axios, { AxiosResponse } from "axios";
import { defaultError, mailingUrl } from "../config/api";

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

export { getMailsListRequest };
