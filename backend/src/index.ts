import express, { Request, Response } from 'express';
import http from "http";
import { Server, Socket } from "socket.io";
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UserRouter } from './routers/user.router';
import { ResponderRouter } from './routers/responder.router';
import { ChatRouter } from './routers/chat.router';
import { MessageRouter } from './routers/message.router';
import { MessageResponseDto } from './dtos/response/message.response.dto';
import { ChatResponseDto } from './dtos/response/chat.response.dto';
import { SocketService } from './services/socket.service';

dotenv.config();

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || "";
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

declare global {
  namespace Express {
    interface Request {
      token?: {
        userId: string;
        expireDate: Date;
      };
    }
  }
}


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: frontendUrl,
  }
});

const userRouter = new UserRouter();
const responderRouter = new ResponderRouter();
const chatRouter = new ChatRouter();
const socketService = new SocketService(io);
const messageRouter = new MessageRouter(socketService);

app.use(cors({
  origin: frontendUrl
}));

const userSockets = new Map<string, string>();

io.on('connection', (socket) => {
  socket.on('register', (userId: string) => {
    userSockets.set(userId, socket.id);
    socket.data.userId = userId;
  })

  socket.on('newMessage', (message: MessageResponseDto, chat: ChatResponseDto) => {
    const targetSocketId = userSockets.get(chat.owner._id);

    if (targetSocketId) {
      io.to(targetSocketId).emit('message', message, 'chatId', chat._id);
    }
  })

  socket.on('disconnect', () => {
    const userId = socket.data.userId;
    userSockets.delete(userId);
  })
})

app.use(express.json());
app.use('/api/users', userRouter.router);
app.use('/api/responders', responderRouter.router);
app.use('/api/chats', chatRouter.router);
app.use('/api/messages', messageRouter.router);

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Підключено до MongoDB Atlas');

    server.listen(port, () => {
      console.log(`Сервер слухає на http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Помилка підключення до MongoDB:', err);
  });
