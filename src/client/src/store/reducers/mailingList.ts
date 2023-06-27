import {
  GET_MAILS_LIST_PENDING,
  GET_MAILS_LIST_SUCCESS,
  GET_MAILS_LIST_FAILED,
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
import { MailingListActions } from "../actions/mailingList";
import MAIL from "../../types/Mail";
import ERROR from "../../types/Error";

interface MailingListInterface {
  mailsList: MAIL[];
  isLoading: boolean;
  error: ERROR | null;
}

export type MailingListState = MailingListInterface;

const initialState: MailingListState = {
  mailsList: [],
  isLoading: false,
  error: null,
};

export default function mailingListReducer(
  state = initialState,
  action: MailingListActions
): MailingListState {
  switch (action.type) {
    // Get mails list
    case GET_MAILS_LIST_PENDING: {
      return {
        ...state,
        mailsList: [],
        isLoading: true,
        error: null,
      };
    }
    case GET_MAILS_LIST_SUCCESS: {
      return {
        ...state,
        mailsList: action.mailsList,
        isLoading: false,
      };
    }
    case GET_MAILS_LIST_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }

    // Create mail
    case CREATE_MAIL_PENDING: {
      return {
        ...state,
        mailsList: [],
        isLoading: true,
        error: null,
      };
    }
    case CREATE_MAIL_SUCCESS: {
      return {
        ...state,
        mailsList: [...state.mailsList, action.mail],
        isLoading: false,
      };
    }
    case CREATE_MAIL_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }

    // Update mail
    case UPDATE_MAIL_PENDING: {
      return {
        ...state,
        mailsList: [],
        isLoading: true,
        error: null,
      };
    }
    case UPDATE_MAIL_SUCCESS: {
      return {
        ...state,
        mailsList: [
          ...state.mailsList.filter((mail) => mail.id !== action.mail.id),
          action.mail,
        ],
        isLoading: false,
      };
    }
    case UPDATE_MAIL_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }

    // Delete mail
    case DELETE_MAIL_PENDING: {
      return {
        ...state,
        mailsList: [],
        isLoading: true,
        error: null,
      };
    }
    case DELETE_MAIL_SUCCESS: {
      return {
        ...state,
        mailsList: [
          ...state.mailsList.filter((mail) => mail.id !== action.mail.id),
        ],
        isLoading: false,
      };
    }
    case DELETE_MAIL_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
}
