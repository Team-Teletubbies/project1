import { TaskStatus } from '@prisma/client';
// Entity
export interface Subtask {
  id: number;
  taskId: number;
  title: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Input
export interface createSubtaskInput {
  title: string;
  taskId: number;
  status: TaskStatus;
}
