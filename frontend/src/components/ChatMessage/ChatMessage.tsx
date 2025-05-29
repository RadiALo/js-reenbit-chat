import './ChatMessage.css'
import React from "react";

type ChatMessageProps = {
  text: string;
  isUserMessage?: boolean;
  senderIconUri?: string;
  date: Date | string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ text, date, isUserMessage = true, senderIconUri="/user-icon.png" }) => {
  const formattedDate = typeof date === "string" ? date : date.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });

  return (
    <div className={`chat-messages--item ${!isUserMessage ? "sender-item" : ""}`}>
      {!isUserMessage && (
        <img className='user-icon' src={senderIconUri} alt="Sender icon" />
      )}

      <div className="chat-messages--item--content">
        <div className={`chat-messages--item--message ${isUserMessage ? "" : "sender-message"}`}>
          {text}
        </div>

        <div className={`chat-messages--item--date ${!isUserMessage ? "sender-date" : ""}`}>{formattedDate}</div>
      </div>
    </div>
  );
};

export default ChatMessage;