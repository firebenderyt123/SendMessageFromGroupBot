import {
  GET_MAILS_LIST_PENDING,
  GET_MAILS_LIST_SUCCESS,
  GET_MAILS_LIST_FAILED,
  GET_MAIL_PENDING,
  GET_MAIL_SUCCESS,
  GET_MAIL_FAILED,
  CREATE_MAIL_PENDING,
  CREATE_MAIL_SUCCESS,
  CREATE_MAIL_FAILED,
  UPDATE_MAIL_PENDING,
  UPDATE_MAIL_SUCCESS,
  UPDATE_MAIL_FAILED,
  DELETE_MAIL_PENDING,
  DELETE_MAIL_SUCCESS,
  DELETE_MAIL_FAILED,
} from "../constants/mailingList";
import MAIL from "../../types/Mail";
import ERROR from "../../types/Error";

// Get mails list
interface GetMailsListPendingAction {
  type: typeof GET_MAILS_LIST_PENDING;
}

interface GetMailsListSuccessAction {
  type: typeof GET_MAILS_LIST_SUCCESS;
  mailsList: MAIL[];
}

interface GetMailsListFailedAction {
  type: typeof GET_MAILS_LIST_FAILED;
  error: ERROR;
}

// Get mail
interface GetMailPendingAction {
  type: typeof GET_MAIL_PENDING;
}

interface GetMailSuccessAction {
  type: typeof GET_MAIL_SUCCESS;
  mail: MAIL;
}

interface GetMailFailedAction {
  type: typeof GET_MAIL_FAILED;
  error: ERROR;
}

// Create mail
interface CreateMailPendingAction {
  type: typeof CREATE_MAIL_PENDING;
}

interface CreateMailSuccessAction {
  type: typeof CREATE_MAIL_SUCCESS;
  mail: MAIL;
}

interface CreateMailFailedAction {
  type: typeof CREATE_MAIL_FAILED;
  error: ERROR;
}

// Update mail
interface UpdateMailPendingAction {
  type: typeof UPDATE_MAIL_PENDING;
}

interface UpdateMailSuccessAction {
  type: typeof UPDATE_MAIL_SUCCESS;
  mail: MAIL;
}

interface UpdateMailFailedAction {
  type: typeof UPDATE_MAIL_FAILED;
  error: ERROR;
}

// Delete mail
interface DeleteMailPendingAction {
  type: typeof DELETE_MAIL_PENDING;
}

interface DeleteMailSuccessAction {
  type: typeof DELETE_MAIL_SUCCESS;
  mail: MAIL;
}

interface DeleteMailFailedAction {
  type: typeof DELETE_MAIL_FAILED;
  error: ERROR;
}

type MailingListActions =
  | GetMailsListPendingAction
  | GetMailsListSuccessAction
  | GetMailsListFailedAction
  | GetMailPendingAction
  | GetMailSuccessAction
  | GetMailFailedAction
  | CreateMailPendingAction
  | CreateMailSuccessAction
  | CreateMailFailedAction
  | UpdateMailPendingAction
  | UpdateMailSuccessAction
  | UpdateMailFailedAction
  | DeleteMailPendingAction
  | DeleteMailSuccessAction
  | DeleteMailFailedAction;

// Get mails list
const getMailsListPending = (): GetMailsListPendingAction => ({
  type: GET_MAILS_LIST_PENDING,
});

const getMailsListSuccess = (mailsList: MAIL[]): GetMailsListSuccessAction => ({
  type: GET_MAILS_LIST_SUCCESS,
  mailsList: mailsList,
});

const getMailsListFailed = (error: ERROR): GetMailsListFailedAction => ({
  type: GET_MAILS_LIST_FAILED,
  error: error,
});

// Get mail
const getMailPending = (): GetMailPendingAction => ({
  type: GET_MAIL_PENDING,
});

const getMailSuccess = (mail: MAIL): GetMailSuccessAction => ({
  type: GET_MAIL_SUCCESS,
  mail: mail,
});

const getMailFailed = (error: ERROR): GetMailFailedAction => ({
  type: GET_MAIL_FAILED,
  error: error,
});

// Create mail
const createMailPending = (): CreateMailPendingAction => ({
  type: CREATE_MAIL_PENDING,
});

const createMailSuccess = (mail: MAIL): CreateMailSuccessAction => ({
  type: CREATE_MAIL_SUCCESS,
  mail: mail,
});

const createMailFailed = (error: ERROR): CreateMailFailedAction => ({
  type: CREATE_MAIL_FAILED,
  error: error,
});

// Update mail
const updateMailPending = (): UpdateMailPendingAction => ({
  type: UPDATE_MAIL_PENDING,
});

const updateMailSuccess = (mail: MAIL): UpdateMailSuccessAction => ({
  type: UPDATE_MAIL_SUCCESS,
  mail: mail,
});

const updateMailFailed = (error: ERROR): UpdateMailFailedAction => ({
  type: UPDATE_MAIL_FAILED,
  error: error,
});

// Delete mail
const deleteMailPending = (): DeleteMailPendingAction => ({
  type: DELETE_MAIL_PENDING,
});

const deleteMailSuccess = (mail: MAIL): DeleteMailSuccessAction => ({
  type: DELETE_MAIL_SUCCESS,
  mail: mail,
});

const deleteMailFailed = (error: ERROR): DeleteMailFailedAction => ({
  type: DELETE_MAIL_FAILED,
  error: error,
});

export {
  type MailingListActions,
  getMailsListPending,
  getMailsListSuccess,
  getMailsListFailed,
  getMailPending,
  getMailSuccess,
  getMailFailed,
  createMailPending,
  createMailSuccess,
  createMailFailed,
  updateMailPending,
  updateMailSuccess,
  updateMailFailed,
  deleteMailPending,
  deleteMailSuccess,
  deleteMailFailed,
};
