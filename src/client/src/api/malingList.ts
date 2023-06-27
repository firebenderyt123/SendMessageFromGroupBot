import axios, { AxiosResponse } from "axios";
import { defaultError, mailingUrl } from "../config/api";
import { UpdateMailData } from "../types/Mail";

const getMailsListRequest = async (token: string): Promise<AxiosResponse> => {
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

const updateMailRequest = async (
  token: string,
  id: string,
  data: UpdateMailData
): Promise<AxiosResponse> => {
  try {
    const response = await axios.put(mailingUrl + `/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    return error?.response || defaultError;
  }
};

export { getMailsListRequest, updateMailRequest };
