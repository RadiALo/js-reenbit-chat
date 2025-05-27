import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UserRouter } from './routers/user.router';
import { ResponderRouter } from './routers/responder.router';
import { ChatRouter } from './routers/chat.router';
import { MessageRouter } from './routers/message.router';

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

const userRouter = new UserRouter();
const responderRouter = new ResponderRouter();
const chatRouter = new ChatRouter();
const messageRouter = new MessageRouter();

app.use(cors({
  origin: frontendUrl
}));

app.use(express.json());
app.use('/api/users', userRouter.router);
app.use('/api/responders', responderRouter.router);
app.use('/api/chats', chatRouter.router);
app.use('/api/messages', messageRouter.router);

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Підключено до MongoDB Atlas');

    app.listen(port, () => {
      console.log(`Сервер слухає на http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Помилка підключення до MongoDB:', err);
  });
