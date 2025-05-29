import React from "react";

type NotificationProps = {
  title: string;
  message: string;
  onClose: () => void;
};

const Notification: React.FC<NotificationProps> = ({
  title,
  message,
  onClose,
}) => {
  return (
    <div className="notification--item">
      <div>
        <img
          className="user-icon"
          src="/user-icon.png"
          alt="Notification icon"
        />
      </div>

      <div>
        <h3 className="notification--item--h">{title}</h3>
        <span>{message}</span>
      </div>

      <div>
        <button className="notification--item--x" onClick={onClose}>✕</button>
      </div>
    </div>
  );
};

export default Notification;
