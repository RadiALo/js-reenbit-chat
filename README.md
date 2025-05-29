# 🗨️ Chat Application with Auto Response

## 🔗 Live Demo
You can try the app [live demo](https://js-reenbit-chat.onrender.com)!

## 📌 Objective

This is a full-stack chat application built as part of a test assignment. It allows users to create and manage multiple chats, send messages, and receive automatic responses from the backend using random quotes from the [Quotable API](https://api.quotable.io). The app includes real-time features using WebSockets.


## ✅ Features

- Three chats upon registration
- Create a new chat with custom name and responder selection (via dialog)
- Update chat name or responder
- Send and receive messages (Backend auto-replies with a quote (after 3s delay))
- Toast notifications on new messages
- Search functionality for chats
- All data is persisted in MongoDB Atlas
- WebSocket integration via Socket.IO: live updates on all message events
- JWT-based login system, protected API endpoints

## 🛠️ Tech Stack

- Frontend: React (TypeScript), HTML, CSS
- Backend: Node.js, Express, Mongoose
- Database: MongoDB (Atlas)

## 🗃️ MongoDB Data Models

### 👤 User

```
{
  _id: ObjectId,
  name: string,
  email: string,      // unique
  password: string,   // hashed
  createdAt: Date,
  updatedAt: Date
}

```

### 🤖 Responder

```
{
  _id: ObjectId,
  apiId: string,      // unique identifier for external quote API
  name: string,
  createdAt: Date,
  updatedAt: Date
}
```

### 💬 Chat

```
{
  _id: ObjectId,
  owner: ObjectId,         // Ref to User
  responder: ObjectId,     // Ref to Responder
  prefferedName: string,   // Optional custom name
  messages: ObjectId[],    // Ref to Message[]
  lastMessage: ObjectId,   // Ref to latest Message
  createdAt: Date,
  updatedAt: Date
}
```

### ✉️ Message

```
{
  _id: ObjectId,
  chat: ObjectId,           // Ref to Chat
  sender: ObjectId,         // Ref to User or Responder
  senderModel: 'User' | 'Responder',
  text: string,
  createdAt: Date,
  updatedAt: Date
}
```
> 💡 Note: The senderModel and refPath setup enables polymorphic referencing for messages (either from a user or a bot responder).

## 📦 REST API Endpoints

The application follows a layered architecture based on Repository → Service → Controller → Router, ensuring separation of concerns, testability, and maintainability. Data validation and transformation are handled using DTOs to ensure clean data flow between layers.

### Users
- POST `/users/register` : Register a new user and receive JWT token
- POST `/users/login` : Log in and receive JWT token
- GET `/users/me` : Get current logged-in user

### Chats
- GET `/chats/user/:id` : Get all chats for a specific user
- GET `/chats/:id` : Get a chat by ID
- POST `/chats` : Create a new chat
- PATCH `/chats/preffered` : Update the preferred name of a chat
- DELETE `chars/:id` : Delete a chat (with confirmation prompt)

### Messaes
- POST `/messages/send` : Send a user message to a chat (triggers auto-response)

### Responders
- GET `/responders` : Get all responders
- GET `/responders/:id` : Get specific responder by ID
> 💡 Note: Responders are fetched from the Quotable API. The list is updated every hour via a cron job..

### Security
All necessary endpoints provided `authMiddleware` and require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## 🧩 Frontend Overview
The frontend is built with React + TypeScript, providing a responsive and interactive user experience. It connects to the backend via REST API and WebSocket for real-time messaging.

### Features
- JWT-based authentication (login/register forms)
- Forms validation with `useForm` hook
- Toast notifications for new messages
- Real-time updating UI with new messages
- Chat creation, editing and deleting with confirmation

### Files structure
```
src/
├── components/           # Reusable UI components
├── forms/                # Forms with validation
├── socket/socket.ts      # Live socket
├── types/                # DTOs
└── App.tsx
```

## 🧪 How to Run the Project Locally

### 1. Clone the repository

```
git clone https://github.com/RadiALo/js-reenbit-chat.git
cd chat-app
```

### 2. Backend Setup

```
cd backend
npm install
```

Create `.env` file in the `backend` directory:
```
PORT = 5000
MONGO_URI = your_mongodb_uri
JWT_SECRET = your_jwt_secret
FRONTEND_URL = http://localhost:3000
NODE_TLS_REJECT_UNAUTHORIZED = 0
```

Then run the backend:
```
npm run dev
```

### 3. Frontend Setup

Create `.env` file in the `frontend` directory:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

Then run:
```
cd ../frontend
npm install
npm run dev
```