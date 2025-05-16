import {
  info,
  updateUserWithPassword,
  myProject,
  totalProject,
  projectData,
  findTaskWithFilters,
} from '../repositories/userRepository';
import { getUserDTO, patchUserDTO } from '../dto/authDto';
import NotFoundError from '../lib/errors/notFoundError';
import { UpdateUserDataType, UserPageParams, TaskFilterParams } from '../types/userType';
import { comparePassword, hashPassword } from '../lib/auth/hash';
import BadRequestError from '../lib/errors/badRequestError';
import dayjs from 'dayjs';
import { UserTaskResponseDTO } from '../dto/userDto';

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

export const userProject = async (userId: number, params: UserPageParams) => {
  const projects = await myProject(userId, params);

  const data = projects.map((project) => {
    const todoCount = project.tasks.filter((task) => task.status === 'TODO').length;
    const inProgressCount = project.tasks.filter((task) => task.status === 'IN_PROGRESS').length;
    const doneCount = project.tasks.filter((task) => task.status === 'DONE').length;

    return {
      id: project.id,
      name: project.name,
      description: project.description,
      memberCount: project.members.length,
      todoCount,
      inProgressCount,
      doneCount,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  });

  const total = await totalProject(userId);

  return { data, total };
};

export const userTask = async (userId: number, params: TaskFilterParams) => {
  const projects = await projectData(userId);

  if (projects.length === 0) {
    return [];
  }

  const tasks = await findTaskWithFilters(projects, params);
  const from = params.from ? dayjs(params.from) : null;
  const to = params.to ? dayjs(params.to) : null;
  const filtered = tasks.filter((task) => {
    const projectStart = dayjs()
      .year(task.project.startYear)
      .month(task.project.startMonth - 1)
      .date(task.project.startDay);

    const projectEnd = dayjs()
      .year(task.project.endYear)
      .month(task.project.endMonth - 1)
      .date(task.project.endDay);

    if (from && projectStart.isBefore(from)) return false;
    if (to && projectEnd.isAfter(to)) return false;

    return true;
  });

  return filtered.map((task) => new UserTaskResponseDTO(task));
};
