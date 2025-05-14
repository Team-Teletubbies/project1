import { Request, Response } from 'express';
import { create } from 'superstruct';
import { createUserBodyStruct, loginBodyStruct } from '../structs/userStruct';
import { createUserService, loginUserService } from '../services/authService';

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
