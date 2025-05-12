import { prisma } from '../lib/prisma';
import { User, userType } from '../types/authType';

export const emailMatch = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUserRepositroy = async (users: userType): Promise<User> => {
  return prisma.user.create({ data: users });
};

export const saveRefreshToken = async (
  refreshToken: string,
  userId: number,
): Promise<User | null> => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      refreshToken: refreshToken,
    },
  });
};
