import React from "react";
import ChatMessage from "./ChatMessage";
import { ChatDto } from "../types/ChatDto";
import SendMessageBar from "./SendMessageBar";
import { MessageDto } from "../types/MessageDto";

type ChatProps = {
  chat: ChatDto | null;
  onSendMessage?: (message: MessageDto) => void;
};

const Chat: React.FC<ChatProps> = ({ chat, onSendMessage }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const handleSendMessage = (message: string) => {
    const sendMessage = async (message: string) => {
      console.log("Sending message:", message);
      const response = await fetch(`${apiUrl}/messages/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          chatId: chat?.id,
          userId: chat?.owner._id,
          text: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const newMessage: MessageDto = await response.json();
      onSendMessage?.(newMessage);
    }

    if (!chat) return;

    sendMessage(message).catch((error) => {
      console.error("Error sending message:", error);
    });
  }

  return (
    <>
      <div className="chat-header">
        <img className="user-icon" src="/user-icon.png" alt="User icon" />

        <div className="chat-header--name">{chat?.responder.name}</div>
      </div>

      <div className="chat-messages">
        <div className="chat-messages--list">
          {chat?.messages.map((message) => (
            <ChatMessage
              key={message._id}
              text={message.text}
              date={new Date(message.createdAt).toLocaleString()}
              isUserMessage={message.senderModel === "User"}
            />
          ))}
          {chat?.messages.length === 0 && (
            <div className="chat-messages--empty">
              No messages yet. Start the conversation!
            </div>
          )}
        </div>

        <SendMessageBar onSend={handleSendMessage}/>
      </div>
    </>
  );
};

export default Chat;
