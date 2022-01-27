import { FunctionComponent, useContext } from "react";
import NotificationContext from "../store/notification-context";
import { INotification } from "../types";
import ErrorIcon from "./icons/error-icon";

const Notification: FunctionComponent<INotification> = (props) => {
  const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;
  let activeClasses = "";

  if (status === "success") {
    activeClasses = "bg-green-400";
  }

  if (status === "error") {
    activeClasses = "bg-red-400";
  }

  if (status === "pending") {
    activeClasses = "bg-gray-400";
  }

  const classesCombined = `${activeClasses} fixed bottom-0 left-0 h-20 w-full flex px-10 py-5 justify-center`;
  return (
    <div className={classesCombined} onClick={notificationCtx.hideNotification}>
      {status === "error" && <ErrorIcon className=" h-14" />}
      <div className="px-5">
        <h2 className="uppercase font-bold">{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Notification;
