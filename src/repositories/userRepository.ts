import { prisma } from '../lib/prisma';
import { UserUpdateDataForRepo } from '../types/userType';

export const info = async (userId: number) => {
  return prisma.user.findUnique({
    where: { id: userId },
  });
};

export const updateUserWithPassword = async (id: number, data: UserUpdateDataForRepo) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};
