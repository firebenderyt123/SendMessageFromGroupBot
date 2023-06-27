import { getMailsListRequest, updateMailRequest } from "../api/malingList";
import { AppDispatch } from "../store";
import {
  getMailsListFailed,
  getMailsListPending,
  getMailsListSuccess,
  updateMailPending,
  updateMailSuccess,
  updateMailFailed,
} from "../store/actions/mailingList";
import { UpdateMailData } from "../types/Mail";

const getMailsList = (token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(getMailsListPending());
      const response = await getMailsListRequest(token);
      if (response.status === 200) {
        dispatch(getMailsListSuccess(response.data));
      } else {
        dispatch(getMailsListFailed(response.data));
      }
    } catch (error: any) {
      dispatch(getMailsListFailed(error));
      throw error;
    }
  };
};

const updateMail = (token: string, id: string, data: UpdateMailData) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(updateMailPending());
      const response = await updateMailRequest(token, id, data);
      if (response.status === 200) {
        dispatch(updateMailSuccess(response.data));
      } else {
        dispatch(updateMailFailed(response.data));
      }
    } catch (error: any) {
      dispatch(updateMailFailed(error));
      throw error;
    }
  };
};

export { getMailsList, updateMail };
