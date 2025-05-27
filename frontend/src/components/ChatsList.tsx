import React from "react";
import ChatEntry from "./ChatEntry";
import { Chat } from "../types/Chat";

type ChatEntryProps = {
  chats: Chat[];
}

const ChatsList: React.FC<ChatEntryProps> = ({ chats }) => {
  return (
    <div className="chats--list">
      <h2 className="chats--h">Chats</h2>

      {
        chats.map((chat, index) => (
          <ChatEntry
            key={index}
            name={chat.responder.name}
            message={chat.lastMessage?.text || "Start a conversation"}
            date={chat.lastMessage?.date || ""}
          />
        ))
      }
    </div>
  );
};

export default ChatsList;
