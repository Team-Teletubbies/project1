// Request

import { TaskStatus } from '@prisma/client';
import { Subtask } from '../types/subtask';

export interface CreateSubtaskDTO {
  title: string;
  taskId: number;
  userId: number;
}

// Response
export class SubtaskResponseDTO {
  title: string;
  taskId: number;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(subtask: Subtask) {
    (this.title = subtask.title),
      (this.taskId = subtask.taskId),
      (this.status = subtask.status),
      (this.createdAt = subtask.createdAt),
      (this.updatedAt = subtask.updatedAt);
  }
}
