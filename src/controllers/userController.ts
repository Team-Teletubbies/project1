import { Response } from 'express';
import { AuthenticatedRequest } from '../types/express';
import { infoUser, pathUser, userProject, userTask } from '../services/userService';
import { updateUserBodyStruct } from '../structs/userStruct';
import { create } from 'superstruct';
import { UpdateUserDataType } from '../types/userType';
import { userPageParamStruct, userTaskPageParamStruct } from '../structs/commonStruct';

export const infoMe = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;

  const result = await infoUser(user.userId);

  res.status(200).json(result);
  return;
};

export const patchMe = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;

  const data = create(req.body, updateUserBodyStruct);
  const userData: UpdateUserDataType = {
    id: user.userId,
    ...data,
  };

  const result = await pathUser(userData);
  res.status(200).json(result);
  return;
};

export const userProjects = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  const params = create(req.query, userPageParamStruct);
  const result = await userProject(user.userId, params);

  res.status(200).json(result);
  return;
};

export const userTasks = async (req: AuthenticatedRequest, res: Response) => {
  console.log(req.user, req.query);

  const user = req.user;
  const params = create(req.query, userTaskPageParamStruct);

  const result = await userTask(user.userId, params);

  res.status(200).json(result);
};
