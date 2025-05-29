import React, { useState, useEffect, useContext, createContext, ReactNode } from "react";
import Notification from "./Notification";

interface NotificationItem {
  id: number;
  title: string;
  message: string;
}

interface NotificationContextType {
  notify: (title: string, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotification must be used within NotificationList");
  return context;
};


const NotificationList: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const notify = (title: string, message: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, {id, title, message }]);
  }

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    if (notifications.length === 0) return;

    const interval = setInterval(() => {
      setNotifications((prev) => prev.slice(1));
    }, 15000);

    return () => clearInterval(interval);
  }, [notifications]);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}

      <div className="notification--list">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            title={notification.title}
            message={notification.message}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export default NotificationList;