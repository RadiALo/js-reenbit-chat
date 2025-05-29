import "./SendMessageBar.css";
import React, { useState, useRef, useEffect } from "react";

interface SendMessageBarProps {
  disabled: boolean;
  onSend: (message: string) => void;
}

const SendMessageBar: React.FC<SendMessageBarProps> = ({
  disabled,
  onSend,
}) => {
  const [message, setMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
    }
  };

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        (textareaRef.current.scrollHeight > 200
          ? 200
          : textareaRef.current.scrollHeight) + "px";
    }
  };
  useEffect(() => {
    resizeTextarea();
  }, [message]);

  return (
    <div className="chat-messages--bar">
      <textarea
        ref={textareaRef}
        className="chat-messages--bar--input"
        disabled={disabled}
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
        style={{ resize: "none" }}
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
