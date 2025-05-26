import React, { useEffect, useState } from "react";
import "./App.css";
import ChatMessage from "./components/ChatMessage";
import Dialog from "./components/Dialog";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import ChatsList from "./components/ChatsList";

const App: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = React.useState(false);

  const [name, setName] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setName(userData.name);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchUserData();
    } else {
      setName("");
    }
  }, [token]);

  return (
    <>
      <div className="main-grid">
        <div className="profile">
          <div className="profile--header">
            <img className="user-icon" src="/user-icon.png" alt="User icon" />
            <div className="profile--name">{name}</div>

            {token ? (
              <button
                className="button"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("expireDate");
                  localStorage.removeItem("userId");
                  setToken(null);
                }}
              >
                Log Out
              </button>
            ) : (
              <button
                className="button"
                onClick={() => {
                  setLoginDialogOpen(true);
                }}
              >
                Log In
              </button>
            )}
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
          {token ? (
            <ChatsList />
          ) : (
            <div className="chats--not-logged-in">
              <h2>Welcome to Chat App</h2>
              <p>Please <button
              className="link"
              onClick={() => {
                setRegisterDialogOpen(false);
                setLoginDialogOpen(true);
              }}
            >
              log in
            </button> to start conversation!</p>
            </div>
          )}
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

      <Dialog
        title="Log In"
        isOpen={loginDialogOpen}
        onClose={() => {
          setLoginDialogOpen(false);
        }}
      >
        <LoginForm
          onLoginSuccess={(token) => {
            setLoginDialogOpen(false);
            setToken(token);
          }}
        />

        <div>
          Don't have an account?{" "}
          <button
            className="link"
            onClick={() => {
              setLoginDialogOpen(false);
              setRegisterDialogOpen(true);
            }}
          >
            Register
          </button>
          .
        </div>
      </Dialog>

      <Dialog
        title="Register"
        isOpen={registerDialogOpen}
        onClose={() => {
          setRegisterDialogOpen(false);
        }}
      >
        <RegisterForm
          onRegisterSuccess={(token) => {
            setRegisterDialogOpen(false);
            setToken(token);
          }}
        />

        <div>
          Have an account?{" "}
          <button
            className="link"
            onClick={() => {
              setRegisterDialogOpen(false);
              setLoginDialogOpen(true);
            }}
          >
            Login
          </button>
          .
        </div>
      </Dialog>
    </>
  );
};

export default App;
