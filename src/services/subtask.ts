import { TaskStatus } from '@prisma/client';
import { CreateSubtaskDTO, SubtaskResponseDTO } from '../dto/subtask';
import UnauthorizedError from '../lib/errors/unauthorizedError';
import { createSubtaskInput } from '../types/subtask';
import { create } from '../repositories/subtask';

export const createSubtask = async (dto: CreateSubtaskDTO): Promise<SubtaskResponseDTO> => {
  const { userId, taskId, title } = dto;
  const isMember = await isProjectMember(userId, taskId);
  if (!isMember) {
    throw new UnauthorizedError('프로젝트의 멤버가 아닙니다.');
  }
  const subtaskData: createSubtaskInput = { taskId, title, status: TaskStatus.TODO };
  const createdSubtask = await create(subtaskData);
  return new SubtaskResponseDTO(createdSubtask);
};

const isProjectMember = async (userId: number, taskId: number): Promise<Boolean> => {
  // 정은 Todo : memberRepository에 해당 함수 만들기
  // 정은 ? : 이거 자주 쓰인다면 미들웨어로 빼버리는게 나을까요?
  const member = await memberRepository.findByUserAndTask(userId, taskId);
  if (!member) {
    return false;
  }
  return true;
};
