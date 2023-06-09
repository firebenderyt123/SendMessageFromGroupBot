import axios, { AxiosResponse } from "axios";
import { usersUrl } from "../config/api";
import { CreateUserData } from "../models/user";

async function getUsersRequest(token: string): Promise<AxiosResponse> {
  try {
    const response = await axios.get(usersUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
}

async function getUserRequest(
  token: string,
  id: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.get(`${usersUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
}

async function createUserRequest(
  token: string,
  data: CreateUserData
): Promise<AxiosResponse> {
  try {
    const response = await axios.post(usersUrl, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
}

export { getUsersRequest, getUserRequest, createUserRequest };
