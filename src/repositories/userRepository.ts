import { TaskStatus } from '@prisma/client';
import { prisma } from '../lib/prisma';
import {
  UserUpdateDataForRepo,
  UserPageParams,
  TaskFilterParams,
  TaskWithRelations,
} from '../types/userType';

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

export const myProject = async (userId: number, params: UserPageParams) => {
  return prisma.project.findMany({
    where: {
      members: {
        some: {
          userId,
          memberStatus: 'ACCEPTED',
        },
      },
    },
    skip: (params.page - 1) * params.limit,
    take: params.limit,
    orderBy: {
      [params.order_by]: params.order,
    },
    include: {
      members: { select: { userId: true } },
      tasks: { select: { status: true } },
    },
  });
};

export const totalProject = async (userId: number): Promise<number> => {
  return prisma.project.count({
    where: {
      members: {
        some: {
          userId,
          memberStatus: 'ACCEPTED',
        },
      },
    },
  });
};

export const projectData = async (userId: number): Promise<number[]> => {
  const result = await prisma.member.findMany({
    where: { userId, memberStatus: 'ACCEPTED' },
    select: { projectId: true },
  });

  return result.map((data) => data.projectId);
};

export const findTaskWithFilters = async (
  projectIds: number[],
  params: TaskFilterParams,
): Promise<TaskWithRelations[]> => {
  return prisma.task.findMany({
    where: {
      projectId: { in: projectIds },
      ...(params.status && { status: params.status.toUpperCase() as TaskStatus }),
      ...(params.assignee && { assignId: params.assignee }),
      ...(params.keyword && { title: { contains: String(params.keyword) } }),
    },

    include: {
      assignee: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        },
      },
      taskTags: {
        include: {
          tag: { select: { id: true, name: true } },
        },
      },
      attachments: {
        select: { id: true, url: true },
      },
      project: {
        select: {
          startYear: true,
          startMonth: true,
          startDay: true,
          endYear: true,
          endMonth: true,
          endDay: true,
        },
      },
    },
  });
};
