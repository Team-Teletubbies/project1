import { hashPassword } from '../lib/auth/hash';
import BadRequestError from '../lib/errors/badRequestError';
import { createUserRepositroy, matchEmail, saveRefreshToken } from '../repositories/authrepository';
import { userLoginType, userInput } from '../types/authType';
import { createUserResponseDTO, tokenResponsDTO } from '../dto/authDto';
import NotFoundError from '../lib/errors/notFoundError';
import bcrypt from 'bcrypt';
import { createToken } from '../lib/auth/jwt';

export const createUserService = async (user: userInput) => {
  const { email, password, ...rest } = user;

  const existingEmail = await matchEmail(email);

  if (existingEmail) {
    throw new BadRequestError('이미 존재하는 이메일입니다.');
  }

  const hashedPassword = await hashPassword(password);

  const users: userInput = {
    email,
    password: hashedPassword,
    ...rest,
  };

  const returnData = await createUserRepositroy(users);

  return new createUserResponseDTO(returnData);
};

export const loginUserService = async (user: userLoginType) => {
  const { email, password } = user;

  const existingEmail = await matchEmail(email);

  if (!existingEmail) {
    throw new NotFoundError('존재하지 않거나 비밀번호가 일치하지 않습니다');
  }

  const isValidPassword = await bcrypt.compare(password, existingEmail.password);

  if (!isValidPassword) {
    throw new NotFoundError('존재하지 않거나 비밀번호가 일치하지 않습니다');
  }

  const userId = existingEmail.id;

  const tokens = await createTokens(userId);

  return new tokenResponsDTO(tokens);
};

const createTokens = async (
  userId: number,
): Promise<{ accessToken: string; refreshToken: string }> => {
  const accessToken = createToken(userId);
  const refreshToken = createToken(userId);
  await saveRefreshToken(refreshToken, userId);

  return { accessToken, refreshToken };
};

export const refreshToken = async (
  id: number,
): Promise<{ accessToken: string; refreshToken: string }> => {
  const tokens = await createTokens(id);

  return new tokenResponsDTO(tokens);
};
