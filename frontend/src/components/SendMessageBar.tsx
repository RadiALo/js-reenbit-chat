import React from "react";

interface SendMessageBarProps {
  onSend: (message: string) => void;
};

const SendMessageBar: React.FC<SendMessageBarProps> = ({ onSend }) => {
  const [message, setMessage] = React.useState<string>("");

  const handleSend = () => {
    if (message.trim() !== "") {
      onSend(message);
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <div className="chat-messages--bar">
      <textarea
        className="chat-messages--bar--input"
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Type your message"
      />
      <button
        type="button"
        className="chat-messages--send-button"
        aria-label="Send message"
        onClick={handleSend}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          fill="currentColor"
        >
          <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
        </svg>
      </button>
    </div>
  );
};

export default SendMessageBar;
