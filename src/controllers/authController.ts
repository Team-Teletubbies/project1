import { Request, Response } from 'express';
import { create } from 'superstruct';
import { createUserBodyStruct, loginBodyStruct } from '../structs/userStruct';
import { createUserService, loginUserService, refreshToken } from '../services/authService';
import { AuthenticatedRequest } from '../types/express';

export const createUser = async (req: Request, res: Response) => {
  const user = create(req.body, createUserBodyStruct);
  const result = await createUserService(user);

  res.status(201).json(result);
};

export const loginUser = async (req: Request, res: Response) => {
  const user = create(req.body, loginBodyStruct);
  const result = await loginUserService(user);

  res.status(200).json(result);
};

export const refreshTokenUser = async (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req.user;
  const result = await refreshToken(userId);

  res.status(200).json(result);
};
