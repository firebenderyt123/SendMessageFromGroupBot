import {
  getUsersRequest,
  getUserRequest,
  createUserRequest,
} from "../api/users";
import Response from "../classes/Response";
import USER from "../models/user";
import { getToken } from "../utils/auth";
import { logger } from "../utils/logger";

async function getUsers(): Promise<Response<USER[]>> {
  const token = getToken();
  try {
    const response = await getUsersRequest(token);
    if (response.status === 200) {
      return new Response<USER[]>(response.data);
    } else {
      return new Response<USER[]>(null, response.data);
    }
  } catch (error: any) {
    logger("Error", error);
    return new Response<USER[]>(null, error);
  }
}

async function getUser(id: number): Promise<Response<USER>> {
  const token = getToken();
  try {
    const response = await getUserRequest(token, id);
    if (response.status === 200) {
      return new Response<USER>(response.data);
    } else {
      return new Response<USER>(null, response.data);
    }
  } catch (error: any) {
    logger("Error", error);
    return new Response<USER>(null, error);
  }
}

async function createUser(
  id: number,
  firstName: string
): Promise<Response<USER>> {
  const token = getToken();
  const data = {
    id,
    firstName,
  };
  try {
    const response = await createUserRequest(token, data);
    if (response.status === 200) {
      return new Response<USER>(response.data);
    } else {
      return new Response<USER>(null, response.data);
    }
  } catch (error: any) {
    logger("Error", error);
    return new Response<USER>(null, error);
  }
}

export { getUsers, getUser, createUser };
