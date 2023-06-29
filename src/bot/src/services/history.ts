import { createFileHistoryRequest } from "../api/history";
import Response from "../classes/Response";
import FILE_HISTORY from "../models/history";
import { getToken } from "../utils/auth";
import { logger } from "../utils/logger";

async function createFileHistory(
  postId: number,
  fileIds: number[]
): Promise<Response<FILE_HISTORY>> {
  const token = getToken();
  const data = {
    postId,
    fileIds,
  };
  try {
    const response = await createFileHistoryRequest(token, data);
    if (response.status === 200) {
      return new Response<FILE_HISTORY>(response.data);
    } else {
      return new Response<FILE_HISTORY>(null, response.data);
    }
  } catch (error: any) {
    logger("Error", error);
    return new Response<FILE_HISTORY>(null, error);
  }
}

export { createFileHistory };
