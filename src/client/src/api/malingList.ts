import axios, { AxiosResponse } from "axios";
import { mailingUrl } from "../config/api";
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
    if (error?.message) throw error;
    return error?.response;
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
    if (error?.message) throw error;
    return error?.response;
  }
};

export { getMailsListRequest, updateMailRequest };
