import { RootState } from "../";
import ERROR from "../../types/Error";
import MAIL from "../../types/Mail";

const selectMailsList = (state: RootState): MAIL[] =>
  state.mailingList.mailsList;
const selectIsLoading = (state: RootState): boolean =>
  state.mailingList.isLoading;
const selectError = (state: RootState): ERROR | null => state.mailingList.error;

export { selectMailsList, selectIsLoading, selectError };
