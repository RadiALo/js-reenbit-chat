import './ChatsList.css'
import React from "react";
import ChatEntry from "../ChatEntry/ChatEntry";
import { ChatDto } from "../../types/ChatDto";

type ChatEntryProps = {
  chats: ChatDto[];
  filter: string;
  onChatClick: (chat: ChatDto) => void;
}

const ChatsList: React.FC<ChatEntryProps> = ({ chats, filter, onChatClick }) => {
  return (
    <div className="chats--list">
      <h2 className="chats--h">Chats</h2>
      
      {
        chats.filter((chat) => chat.responder.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).map((chat, index) => (
          <ChatEntry
            key={index}
            onClick={() => onChatClick(chat)}
            name={!chat.prefferedName || chat.prefferedName === '' ? chat.responder.name : chat.prefferedName}
            message={chat.lastMessage?.text || "Start a conversation"}
            date={chat.lastMessage?.createdAt}
          />
        ))
      }
    </div>
  );
};

export default ChatsList;
