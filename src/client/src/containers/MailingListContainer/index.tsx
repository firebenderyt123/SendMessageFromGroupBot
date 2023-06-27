import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { getMailsList } from "../../services/mailingList";
import { selectMailsList } from "../../store/selectors/mailingList";

function MailingListContainer() {
  const dispatch = useAppDispatch();
  const mailsList = useAppSelector(selectMailsList);

  React.useEffect(() => {
    dispatch(getMailsList("12"));
  }, [dispatch]);

  console.log(mailsList);

  return <div>MailingListContainer</div>;
}

export default MailingListContainer;
