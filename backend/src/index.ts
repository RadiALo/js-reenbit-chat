import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UserRouter } from './routers/user.router';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || "";
const userRouter = new UserRouter();

app.use(express.json());
app.use('/api/users', userRouter.router);


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
