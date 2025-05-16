import { TaskWithRelations, TaskStatusClient } from '../types/userType';

export class UserTaskResponseDTO {
  id: number;
  projectId: number;
  title: string;

  startYear: number;
  startMonth: number;
  startDay: number;

  endYear: number;
  endMonth: number;
  endDay: number;

  status: 'todo' | 'in_progress' | 'done';

  assignee: {
    id: number;
    name: string;
    email: string;
    profileImage: string | null;
  } | null;

  tags: { id: number; name: string }[];
  attachments: { id: number; url: string }[];

  createdAt: Date;
  updatedAt: Date;

  constructor(task: TaskWithRelations) {
    this.id = task.id;
    this.projectId = task.projectId;
    this.title = task.title;
    this.startYear = task.project.startYear;
    this.startMonth = task.project.startMonth;
    this.startDay = task.project.startDay;
    this.endYear = task.project.endYear;
    this.endMonth = task.project.endMonth;
    this.endDay = task.project.endDay;
    this.status = task.status.toLowerCase() as TaskStatusClient;
    this.assignee = task.assignee;
    this.tags = task.taskTags.map((tags) => tags.tag);
    this.attachments = task.attachments;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
  }
}
