import React from "react";
import "./App.css";
import ChatMessage from "./components/ChatMessage";
import ChatEntry from "./components/ChatEntry";
import Dialog from "./components/Dialog";
import LoginForm from "./forms/LoginForm";

const App: React.FC = () => {
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);

  return (
    <div>
      <div className="main-grid">
        <div className="profile">
          <div className="profile--header">
            <img className="user-icon" src="/user-icon.png" alt="User icon" />
            <div className="profile--name">Danylo Kozakov</div>

            <button
              className="button"
              onClick={() => {
                setLoginDialogOpen(true);
              }}
            >Log In</button>
          </div>

          <div className="profile--search">
            <input
              className="profile--search--input"
              type="text"
              placeholder="Search or start new chat"
            />
          </div>
        </div>

        <div className="chats">
          <h2 className="chats--h">Chats</h2>

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
        </div>

        <div className="chat-header">
          <img className="user-icon" src="/user-icon.png" alt="User icon" />

          <div className="chat-header--name">Alice Freeman</div>
        </div>

        <div className="chat-messages">
          <div className="chat-messages--list">
            <ChatMessage
              text="How was your meeting?"
              date="8/17/2022, 7:43 AM"
              isUserMessage={false}
            />
            <ChatMessage
              text="Not bad. What about you?"
              date="8/17/2022, 7:45 AM"
            />
            <ChatMessage
              text="How was your meeting?"
              date="8/17/2022, 7:46 AM"
            />
          </div>

          <div className="chat-messages--bar">
            <textarea
              className="chat-messages--bar--input"
              rows={1}
              placeholder="Type your message"
            />
          </div>
        </div>
      </div>

      <div>
        <Dialog title="Log In" isOpen={loginDialogOpen} onClose={() => {setLoginDialogOpen(false);}}>
          <LoginForm />
        </Dialog>
      </div>
    </div>
  );
};

export default App;
