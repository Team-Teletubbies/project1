import express from 'express';
import { createUser } from '../controllers/authController';
export const authRouter = express.Router();

authRouter.post('/register', createUser);
