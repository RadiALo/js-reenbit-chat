import React from "react";
import ChatEntry from "./ChatEntry";
import { ChatDto } from "../types/ChatDto";

type ChatEntryProps = {
  chats: ChatDto[];
  onChatClick: (chat: ChatDto) => void;
}

const ChatsList: React.FC<ChatEntryProps> = ({ chats, onChatClick }) => {
  return (
    <div className="chats--list">
      <h2 className="chats--h">Chats</h2>

      {
        chats.map((chat, index) => (
          <ChatEntry
            key={index}
            onClick={() => onChatClick(chat)}
            name={chat.responder.name}
            message={chat.lastMessage?.text || "Start a conversation"}
            date={chat.lastMessage?.createdAt || ""}
          />
        ))
      }
    </div>
  );
};

export default ChatsList;
