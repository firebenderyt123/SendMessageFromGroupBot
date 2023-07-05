import axios, { AxiosResponse } from "axios";
import { fileStatsUrl, historyUrl } from "../config/api";
import { CreateFileHistoryData } from "../models/history";

async function createFileHistoryRequest(
  token: string,
  data: CreateFileHistoryData
): Promise<AxiosResponse> {
  try {
    const response = await axios.post(historyUrl, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
}

async function getFileHistoryStatsRequest(
  token: string
): Promise<AxiosResponse> {
  try {
    const response = await axios.get(fileStatsUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
}

export { createFileHistoryRequest, getFileHistoryStatsRequest };
