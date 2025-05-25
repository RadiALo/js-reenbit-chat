import React from "react";
import ChatEntry from "./ChatEntry";

const ChatsList: React.FC = () => {
  return (
    <div className="chats--list">
      <ChatEntry
        name="Alice Freemab"
        message="How was your meeting?"
        date="Aug 17, 2012"
      />
      <ChatEntry
        name="Alice Freemab"
        message="How was your meeting?"
        date="Aug 17, 2012"
      />
      <ChatEntry
        name="Alice Freemab"
        message="How was your meeting?"
        date="Aug 17, 2012"
      />
      <ChatEntry
        name="Alice Freemab"
        message="How was your meeting?"
        date="Aug 17, 2012"
      />
    </div>
  );
};

export default ChatsList;
