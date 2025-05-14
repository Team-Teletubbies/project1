import Express from 'express';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
      };
    }
  }
}

export type AuthenticatedRequest<T extends Request = Request> = T & {
  user: { userId: number };
};
