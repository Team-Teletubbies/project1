import { prisma } from '../lib/prisma';
import { createSubtaskInput } from '../types/subtask';

export const create = async (data: createSubtaskInput) => {
  return await prisma.subTask.create({ data });
};
