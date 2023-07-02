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
  UPLOAD_MAIL_IMAGE_PENDING,
  UPLOAD_MAIL_IMAGE_SUCCESS,
  UPLOAD_MAIL_IMAGE_FAILED,
  DELETE_MAIL_IMAGE_PENDING,
  DELETE_MAIL_IMAGE_SUCCESS,
  DELETE_MAIL_IMAGE_FAILED,
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
        isLoading: true,
        error: null,
      };
    }
    case UPDATE_MAIL_SUCCESS: {
      return {
        ...state,
        mailsList: (() => {
          const newMailsList: MAIL[] = [];
          state.mailsList.forEach((item) => {
            if (item.id !== action.mail.id) newMailsList.push(item);
            else newMailsList.push(action.mail);
          });
          return newMailsList;
        })(),
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

    // Upload/delete mail image
    case UPLOAD_MAIL_IMAGE_PENDING || DELETE_MAIL_IMAGE_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case UPLOAD_MAIL_IMAGE_SUCCESS || DELETE_MAIL_IMAGE_SUCCESS: {
      return {
        ...state,
        mailsList: (() => {
          const newMailsList: MAIL[] = [];
          state.mailsList.forEach((item) => {
            if (item.id !== action.mail.id) newMailsList.push(item);
            else newMailsList.push(action.mail);
          });
          return newMailsList;
        })(),
        isLoading: false,
      };
    }
    case UPLOAD_MAIL_IMAGE_FAILED || DELETE_MAIL_IMAGE_FAILED: {
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
