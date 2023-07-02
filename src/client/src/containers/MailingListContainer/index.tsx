import React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import MailsList from "../../components/MailingList/MailsList";
import MailItemCreate from "../../components/MailingList/MailItemCreate";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import {
  createMail,
  deleteMail,
  deleteMailImage,
  getMailsList,
  updateMail,
  uploadMailImage,
} from "../../services/mailingList";
import {
  selectError,
  selectIsLoading,
  selectMailsList,
} from "../../store/selectors/mailingList";
import {
  CreateMailData,
  UpdateMailData,
  UploadMailImageData,
} from "../../types/Mail";

function MailingListContainer() {
  const [showCreateFrom, setShowCreateForm] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();
  const mailsList = useAppSelector(selectMailsList);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const token = "12";

  React.useEffect(() => {
    dispatch(getMailsList(token));
  }, [dispatch]);

  const handleEditData = React.useCallback(
    (id: string, data: UpdateMailData) => {
      dispatch(updateMail(token, id, data));
    },
    [dispatch]
  );

  const handleImageUpload = React.useCallback(
    (id: string, data: UploadMailImageData) => {
      dispatch(uploadMailImage(token, id, data));
    },
    [dispatch]
  );

  const handleImageDelete = React.useCallback(
    (id: string) => {
      dispatch(deleteMailImage(token, id));
    },
    [dispatch]
  );

  const showCreateFormToggle = React.useCallback(() => {
    setShowCreateForm((prev) => !prev);
  }, []);

  const handleCreateData = React.useCallback(
    (data: CreateMailData) => {
      dispatch(createMail(token, data));
      showCreateFormToggle();
    },
    [dispatch, showCreateFormToggle]
  );

  const handleDeleteData = React.useCallback(
    (id: string) => {
      dispatch(deleteMail(token, id));
    },
    [dispatch]
  );

  const mailListElem = !error && (
    <React.Fragment>
      <Box display="flex" flexDirection="column">
        <MailsList
          mailsList={mailsList}
          onDataEdit={handleEditData}
          onDelete={handleDeleteData}
          onImageUpload={handleImageUpload}
          onImageDelete={handleImageDelete}
        />
        {showCreateFrom ? (
          <MailItemCreate
            onDataCreate={handleCreateData}
            onCancel={showCreateFormToggle}
          />
        ) : (
          <Button onClick={showCreateFormToggle}>Add</Button>
        )}
      </Box>
    </React.Fragment>
  );
  const loadingElem = isLoading && (
    <Box
      position="absolute"
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center">
      <CircularProgress color="primary" />
    </Box>
  );
  const errorElem = error && (
    <Box display="flex">
      <Alert severity="error">{error.message}</Alert>
    </Box>
  );

  return (
    <Box position="relative" display="flex" minHeight="500px">
      {mailListElem}
      {loadingElem}
      {errorElem}
    </Box>
  );
}

export default MailingListContainer;
