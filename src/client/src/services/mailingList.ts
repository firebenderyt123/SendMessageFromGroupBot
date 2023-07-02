import {
  createMailRequest,
  deleteMailImageRequest,
  deleteMailRequest,
  getMailsListRequest,
  updateMailRequest,
  uploadMailImageRequest,
} from "../api/malingList";
import { AppDispatch } from "../store";
import {
  getMailsListFailed,
  getMailsListPending,
  getMailsListSuccess,
  createMailPending,
  createMailSuccess,
  createMailFailed,
  updateMailPending,
  updateMailSuccess,
  updateMailFailed,
  uploadMailImagePending,
  uploadMailImageSuccess,
  uploadMailImageFailed,
  deleteMailImagePending,
  deleteMailImageSuccess,
  deleteMailImageFailed,
  deleteMailPending,
  deleteMailSuccess,
  deleteMailFailed,
} from "../store/actions/mailingList";
import {
  CreateMailData,
  UpdateMailData,
  UploadMailImageData,
} from "../types/Mail";

const getMailsList = (token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(getMailsListPending());
      const response = await getMailsListRequest(token);
      console.log(response);
      if (response.status === 200) {
        dispatch(getMailsListSuccess(response.data));
      } else {
        dispatch(getMailsListFailed(response.data));
      }
    } catch (error: any) {
      dispatch(getMailsListFailed(error));
    }
  };
};

const createMail = (token: string, data: CreateMailData) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(createMailPending());
      const response = await createMailRequest(token, data);
      if (response.status === 200) {
        dispatch(createMailSuccess(response.data));
      } else {
        dispatch(createMailFailed(response.data));
      }
    } catch (error: any) {
      dispatch(createMailFailed(error));
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
    }
  };
};

const deleteMail = (token: string, id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(deleteMailPending());
      const response = await deleteMailRequest(token, id);
      if (response.status === 200) {
        dispatch(deleteMailSuccess(response.data));
      } else {
        dispatch(deleteMailFailed(response.data));
      }
    } catch (error: any) {
      dispatch(deleteMailFailed(error));
    }
  };
};

const uploadMailImage = (
  token: string,
  id: string,
  data: UploadMailImageData
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(uploadMailImagePending());
      const response = await uploadMailImageRequest(token, id, data);
      if (response.status === 200) {
        dispatch(uploadMailImageSuccess(response.data));
      } else {
        dispatch(uploadMailImageFailed(response.data));
      }
    } catch (error: any) {
      dispatch(uploadMailImageFailed(error));
    }
  };
};

const deleteMailImage = (token: string, id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(deleteMailImagePending());
      const response = await deleteMailImageRequest(token, id);
      if (response.status === 200) {
        dispatch(deleteMailImageSuccess(response.data));
      } else {
        dispatch(deleteMailImageFailed(response.data));
      }
    } catch (error: any) {
      dispatch(deleteMailImageFailed(error));
    }
  };
};

export {
  getMailsList,
  createMail,
  updateMail,
  deleteMail,
  uploadMailImage,
  deleteMailImage,
};
