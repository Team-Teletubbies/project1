import express from 'express';
import { createUser, loginUser } from '../controllers/authController';
import { asyncHandler } from '../lib/async-handler';
export const authRouter = express.Router();

authRouter.post('/register', asyncHandler(createUser));
authRouter.post('/login', asyncHandler(loginUser));
