import { Request, Response } from 'express';
import { assert, create } from 'superstruct';
import { IdParamsStruct } from '../structs/commonStruct';
import { createSubtaskBodyStruct } from '../structs/subtaskStruct';
import { CreateSubtaskDTO, SubtaskResponseDTO } from '../dto/subtask';
import * as subtaskService from '../services/subtask';

export const createSubtask = async (req: Request, res: Response): Promise<void> => {
  const { id: taskId } = create(req.params, IdParamsStruct);
  assert(req.body, createSubtaskBodyStruct);
  const userId = 1; // 정은 TODO: req.user에서 받아오기
  const { title } = req.body;
  const dto: CreateSubtaskDTO = { taskId, userId, title };
  const result: SubtaskResponseDTO = await subtaskService.createSubtask(dto);
  res.status(201).json(result);
};
