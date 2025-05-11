import { Request, Response } from 'express';
import { asyncHandler } from '../lib/async-handler';
import { create } from 'superstruct';
import { createUserBodyStruct } from '../structs/userStruct';
import { createUserService } from '../services/authService';

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = create(req.body, createUserBodyStruct);
  const result = await createUserService(user);

  res.status(201).json(result);
});
