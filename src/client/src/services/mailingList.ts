import { getMailsListRequest } from "../api/malingList";
import { AppDispatch } from "../store";
import {
  getMailsListFailed,
  getMailsListPending,
  getMailsListSuccess,
} from "../store/actions/mailingList";

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

export { getMailsList };
