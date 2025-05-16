import express from 'express';
import { createUser, loginUser, refreshTokenUser } from '../controllers/authController';
import { asyncHandler } from '../lib/async-handler';
import { verifyRefreshToken } from '../middlewares/verifyRefreshToken';
export const authRouter = express.Router();

authRouter.post('/register', asyncHandler(createUser));
authRouter.post('/login', asyncHandler(loginUser));
authRouter.post('/refresh', verifyRefreshToken, asyncHandler(refreshTokenUser));
