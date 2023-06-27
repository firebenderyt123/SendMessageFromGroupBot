import React from "react";
import MailsList from "../../components/MailingList/MailsList";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { getMailsList } from "../../services/mailingList";
import { selectMailsList } from "../../store/selectors/mailingList";

function MailingListContainer() {
  const dispatch = useAppDispatch();
  const mailsList = useAppSelector(selectMailsList);

  React.useEffect(() => {
    dispatch(getMailsList("12"));
  }, [dispatch]);

  return (
    <div>
      <MailsList mailsList={mailsList} />
    </div>
  );
}

export default MailingListContainer;
