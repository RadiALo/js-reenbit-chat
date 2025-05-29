import React from "react";

type ChatEntryProps = {
  name: string;
  message: string;
  date: string;
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
      <div className="chats--item--date">{date}</div>
    </div>
  );
};

export default ChatEntry;
