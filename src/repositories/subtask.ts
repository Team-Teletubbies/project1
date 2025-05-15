import { prisma } from '../lib/prisma';
import { createSubtaskInput } from '../types/subtask';

export const create = async (data: createSubtaskInput) => {
  // 정은 Todo: prisma 갖고오기
  return await prisma.subTask.create({ data });
};
