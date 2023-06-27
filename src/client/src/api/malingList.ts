import axios from "axios";
import { defaultError, mailingUrl } from "../config/api";

const getMailsListRequest = async (token: string) => {
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
};

export { getMailsListRequest };
