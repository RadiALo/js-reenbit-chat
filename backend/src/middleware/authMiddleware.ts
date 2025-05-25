import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET || 'your_jwt_secret';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Token:', token);

  if (!token) {
    res.status(401).send('Unauthorized');
    return;
  }

  try {
    const data = jwt.verify(token, JWT_SECRET) as { userId: string, expireDate: Date };

    req.token = data;
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    res.status(401).send('Unauthorized');
  }
};

export default authMiddleware;