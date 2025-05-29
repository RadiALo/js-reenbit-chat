import React, { useEffect, useState } from "react";
import "./App.css";
import Dialog from "./components/Dialog";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import ChatsList from "./components/ChatsList";
import Chat from "./components/Chat";
import { ChatDto } from "./types/ChatDto";
import { MessageDto } from "./types/MessageDto";
import { socket } from "./socket/socket";
import { useNotification } from "./components/NotificationsList";

const App: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const { notify } = useNotification();

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [loginDialogOpen, setLoginDialogOpen] = React.useState<boolean>(false);
  const [registerDialogOpen, setRegisterDialogOpen] = React.useState<boolean>(false);
  const [createChatDialogOpen, setCreateChatDialogOpen] = React.useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>(localStorage.getItem("userId") || "");

  const [chats, setChats] = useState<ChatDto[]>([]);
  const [search, setSearch] = useState<string>('')
  const [openedChat, setOpenedChat] = useState<ChatDto | null>(null);

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
          setId(userData.id);
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
      setId("");
    }
  }, [token, apiUrl]);

  useEffect(() => {
    if (!id) {
      return;
    }
    socket.emit("register", id);

    const handleMessage = ({ message, chatId }: any) => {
      const chat = chats.find((chat) => chat._id === chatId);

      notify(chat?.responder.name || "", message.text);

      if (openedChat && openedChat._id === chatId) {
        appendMessageToOpenedChat(message);
      }
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [id, openedChat]);

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const response = await fetch(`${apiUrl}/chats/user/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const chats = await response.json();
          console.log(chats);

          chats.sort((a: ChatDto, b: ChatDto) => {
            const dateA = a.lastMessage?.createdAt
              ? new Date(a.lastMessage.createdAt).getTime()
              : 0;
            const dateB = b.lastMessage?.createdAt
              ? new Date(b.lastMessage.createdAt).getTime()
              : 0;

            return dateB - dateA;
          });
          setChats(chats);
        } else {
          console.error("Failed to fetch user chats");
        }
      } catch (error) {
        console.error("Error fetching user chats:", error);
      }
    };

    if (token && id) {
      fetchUserChats();
    } else {
      const userId = id || localStorage.getItem("userId");

      if (!id && userId) {
        setId(userId);
      }

      setChats([]);
      setOpenedChat(null);
    }
  }, [id, token, apiUrl]);

  const appendMessageToOpenedChat = (
    message: MessageDto,
  ) => {
    setOpenedChat((prevChat) => {
      if (!prevChat) return prevChat;

      return {
        ...prevChat,
        messages: [...(prevChat.messages || []), message],
      };
    });
  };

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
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Search or start new chat"
            />
          </div>
        </div>

        <div className="chats">
          {token ? (
            <>
              <ChatsList chats={chats} filter={search} onChatClick={setOpenedChat} />
              
              <div className="chats--add-button">
                <button
                  className="button"
                  onClick={() => {setCreateChatDialogOpen(true)}}
                >
                  +
                </button>
              </div>
            </>
            ) : (
            <div className="chats--not-logged-in">
              <h2>Welcome to Chat App</h2>
              <p>
                Please{" "}
                <button
                  className="link"
                  onClick={() => {
                    setRegisterDialogOpen(false);
                    setLoginDialogOpen(true);
                  }}
                >
                  log in
                </button>{" "}
                to start conversation!
              </p>
            </div>
          )}
        </div>

        {<Chat chat={openedChat} onSendMessage={appendMessageToOpenedChat} />}
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

      <Dialog
        title="Create Chat"
        isOpen={createChatDialogOpen}
        onClose={() => {
          setCreateChatDialogOpen(false);
        }}
      >
        <div>

        </div>
      </Dialog>
    </>
  );
};

export default App;
