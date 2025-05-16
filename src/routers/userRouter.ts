import express from 'express';
import { asyncHandler } from '../lib/async-handler';
import { verifyAccessToken } from '../middlewares/verifyAccessToken';
import { infoMe, patchMe } from '../controllers/userController';
export const userRouter = express.Router();

userRouter.get('/me', verifyAccessToken, asyncHandler(infoMe));
userRouter.patch('/me', verifyAccessToken, asyncHandler(patchMe));
