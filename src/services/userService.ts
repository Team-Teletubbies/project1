import { info, updateUserWithPassword } from '../repositories/userRepository';
import { getUserDTO, patchUserDTO } from '../dto/authDto';
import NotFoundError from '../lib/errors/notFoundError';
import { UpdateUserDataType } from '../types/userType';
import { comparePassword, hashPassword } from '../lib/auth/hash';
import BadRequestError from '../lib/errors/badRequestError';

export const infoUser = async (userId: number) => {
  const user = await info(userId);
  if (!user) {
    throw new NotFoundError('존재하지 않는 유저입니다.');
  }
  return new getUserDTO(user);
};

export const pathUser = async (userData: UpdateUserDataType) => {
  const user = await info(userData.id);
  if (!user) {
    throw new NotFoundError('존재하지 않는 유저입니다.');
  }

  if (isPasswordUpdate(userData)) {
    const isMatch = await comparePassword(userData.currentPassword, user.password);
    if (!isMatch) {
      throw new BadRequestError('현재 비밀번호가 일치하지 않습니다.');
    }

    const hashed = await hashPassword(userData.newPassword);
    const { currentPassword, newPassword, ...rest } = userData;

    const passwordData = await updateUserWithPassword(userData.id, { ...rest, password: hashed });
    return new patchUserDTO(passwordData);
  }

  const data = await updateUserWithPassword(userData.id, {
    name: userData.name,
    email: userData.email,
    profileImage: userData.profileImage,
  });

  return new patchUserDTO(data);
};

const isPasswordUpdate = (
  data: UpdateUserDataType,
): data is UpdateUserDataType & { currentPassword: string; newPassword: string } => {
  return 'currentPassword' in data && 'newPassword' in data;
};
