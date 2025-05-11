import { hashPassword } from '../lib/auth/hash';
import BadRequestError from '../lib/errors/badRequestError';
import { createUserRepositroy, emailMatch } from '../repositories/authrepository';
import { userType } from '../types/authType';
import { createUserResponseDTO } from '../dto/authDto';

export const createUserService = async (user: userType) => {
  const { email, password, ...rest } = user;

  const existingEmail = await emailMatch(email);

  if (existingEmail) {
    throw new BadRequestError('이미 존재하는 이메일입니다.');
  }

  const hashedPassword = await hashPassword(password);

  const users: userType = {
    email,
    password: hashedPassword,
    ...rest,
  };

  const returnData = await createUserRepositroy(users);

  return new createUserResponseDTO(returnData);
};
