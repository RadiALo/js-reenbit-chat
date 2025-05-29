import './ChatEntry.css'
import React from "react";

type ChatEntryProps = {
  name: string;
  message: string;
  date?: Date;
  onClick?: () => void;
};

const ChatEntry: React.FC<ChatEntryProps> = ({ name, message, date, onClick }) => {
  return (
    <div onClick={onClick} className="chats--item">

      <img className="user-icon" src="/user-icon.png" alt="User icon" />
      <div className="chats--item--text">
        <p className="chats--item--text--name">{name}</p>
        <p className="chats--item--text--message">{message}</p>
      </div>

      {date && <div className="chats--item--date">{new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })}</div>}
    </div>
  );
};

export default ChatEntry;
