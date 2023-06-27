import React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import MailsList from "../../components/MailingList/MailsList";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { getMailsList, updateMail } from "../../services/mailingList";
import {
  selectError,
  selectIsLoading,
  selectMailsList,
} from "../../store/selectors/mailingList";
import { UpdateMailData } from "../../types/Mail";

function MailingListContainer() {
  const dispatch = useAppDispatch();
  const mailsList = useAppSelector(selectMailsList);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const token = "12";

  React.useEffect(() => {
    dispatch(getMailsList(token));
  }, [dispatch]);

  const handleStopRunBtnOnClick = React.useCallback(
    (id: string, data: UpdateMailData) => {
      dispatch(updateMail(token, id, data));
    },
    [dispatch]
  );

  const mailListElem = !error && !isLoading && (
    <MailsList
      mailsList={mailsList}
      stopRunBtnOnClick={handleStopRunBtnOnClick}
    />
  );
  const loadingElem = isLoading && <CircularProgress color="primary" />;
  const errorElem = error && <Alert severity="error">{error.message}</Alert>;

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center">
      {mailListElem}
      {loadingElem}
      {errorElem}
    </Box>
  );
}

export default MailingListContainer;
