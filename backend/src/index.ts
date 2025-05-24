import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || "";

app.use(express.json());

mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ Підключено до MongoDB Atlas');
    app.listen(port, () => {
      console.log(`🚀 Сервер слухає на http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('❌ Помилка підключення до MongoDB:', err);
  });
