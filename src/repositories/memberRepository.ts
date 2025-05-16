import { prisma } from '../lib/prisma';

export const findByUserAndTask = async (userId: number, taskId: number) => {
  return await prisma.member.findFirst({
    where: {
      userId,
      project: {
        tasks: {
          some: {
            id: taskId,
          },
        },
      },
    },
  });
};
