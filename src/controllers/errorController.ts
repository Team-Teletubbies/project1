import { StructError } from 'superstruct';
import BadRequestError from '../lib/errors/badRequestError';
import UnauthorizedError from '../lib/errors/unauthorizedError';
import NotFoundError from '../lib/errors/notFoundError';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError as JwtUnauthorizedError } from 'express-jwt';

export function defaultNotFoundHandler(req: Request, res: Response, next: NextFunction): void {
  res.status(404).send({ message: 'Not found' });
}

export function globalErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof JwtUnauthorizedError) {
    if (err.code === 'invalid_token') {
      res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
      return;
    }
    if (err.message === 'jwt expired') {
      res.status(401).json({ message: '토큰이 만료되었습니다.' });
      return;
    }
    res.status(401).json({ message: '인증 오류입니다.' });
    return;
  }

  if (err instanceof StructError || err instanceof BadRequestError) {
    res.status(400).send({ message: err.message });
    return;
  }

  if (err instanceof SyntaxError || (isBadRequestError(err) && err.status === 400)) {
    res.status(400).send({ message: 'Inbaild JSON' });
    return;
  }

  if (hasCode(err)) {
    res.status(500).send({ message: 'Failed to process data' });
    return;
  }

  if (err instanceof NotFoundError) {
    res.status(404).send({ message: err.message });
    return;
  }

  if (err instanceof UnauthorizedError) {
    res.status(500).send({ message: 'Internal server error' });
    return;
  }
}

function isBadRequestError(err: unknown): err is BadRequestError {
  return err instanceof BadRequestError;
}

function hasCode(err: unknown): err is { code: string } {
  return typeof err === 'object' && err !== null && 'code' in err;
}
