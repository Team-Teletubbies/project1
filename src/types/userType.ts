import { TaskStatus } from '@prisma/client';

type BaseUserUpdate = {
  id: number;
  name?: string;
  email?: string;
  profileImage?: string | null;
};

type PasswordUpdate = {
  currentPassword: string;
  newPassword: string;
};

export type UpdateUserDataType = BaseUserUpdate | (BaseUserUpdate & PasswordUpdate);

export type UserUpdateDataForRepo = {
  name?: string;
  email?: string;
  profileImage?: string | null;
  password?: string;
};

export type UserPageParams = {
  page: number;
  limit: number;
  order: 'asc' | 'desc';
  order_by: 'createdAt' | 'name';
};

export type TaskFilterParams = {
  from?: string;
  to?: string;
  project_id?: number;
  status?: 'todo' | 'in_progress' | 'done';
  assignee?: number;
  keyword?: string;
};

export type TaskWithRelations = {
  id: number;
  projectId: number;
  title: string;
  status: TaskStatus;
  assignee: {
    id: number;
    name: string;
    email: string;
    profileImage: string | null;
  } | null;
  taskTags: { tag: { id: number; name: string } }[];
  attachments: { id: number; url: string }[];
  createdAt: Date;
  updatedAt: Date;
  project: {
    startYear: number;
    startMonth: number;
    startDay: number;
    endYear: number;
    endMonth: number;
    endDay: number;
  };
};

export type TaskStatusClient = 'todo' | 'in_progress' | 'done';
