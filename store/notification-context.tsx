import { createContext, FunctionComponent, useEffect, useState } from "react";
import { INotification } from "../types";

interface notificationContext {
  notification: INotification | null;
  showNotification: (data: INotification) => void;
  hideNotification: () => void;
}

const notificationContextDefault = {
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
};

const NotificationContext = createContext<notificationContext>(notificationContextDefault);

export const NotificationContextProvider: FunctionComponent = (props) => {
  const [activeNotification, setActiveNotification] = useState<INotification | null>(notificationContextDefault.notification);

  useEffect(() => {
    if (activeNotification && (activeNotification.status === "success" || activeNotification.status === "error")) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotification = (data: INotification) => {
    setActiveNotification(data);
  };

  const hideNotification = () => {
    setActiveNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotification,
    hideNotification: hideNotification,
  };
  return <NotificationContext.Provider value={context}>{props.children}</NotificationContext.Provider>;
};

export default NotificationContext;
