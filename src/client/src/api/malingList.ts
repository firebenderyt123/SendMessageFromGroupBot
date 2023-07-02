import axios, { AxiosResponse } from "axios";
import { mailingUrl } from "../config/api";
import {
  CreateMailData,
  UpdateMailData,
  UploadMailImageData,
} from "../types/Mail";

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

const createMailRequest = async (
  token: string,
  data: CreateMailData
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(mailingUrl, data, {
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

const deleteMailRequest = async (
  token: string,
  id: string
): Promise<AxiosResponse> => {
  try {
    const response = await axios.delete(mailingUrl + `/${id}`, {
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

const uploadMailImageRequest = async (
  token: string,
  id: string,
  data: UploadMailImageData
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(mailingUrl + `/${id}/image`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error: any) {
    if (error?.message) throw error;
    return error?.response;
  }
};

const deleteMailImageRequest = async (
  token: string,
  id: string
): Promise<AxiosResponse> => {
  try {
    const response = await axios.delete(mailingUrl + `/${id}/image`, {
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

export {
  getMailsListRequest,
  createMailRequest,
  updateMailRequest,
  deleteMailRequest,
  uploadMailImageRequest,
  deleteMailImageRequest,
};
