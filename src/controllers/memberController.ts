import { NextFunction, Request, Response } from 'express';
import { sendEmail } from '../services/memberService';

export const sendInvitationEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { from, to, subject, text } = req.body;
    const data = { from, to, subject, text };
    if (!data) {
      res.status(400).json({ message: '모든 필들를 입력해 주세요' });
      return;
    }

    await sendEmail(data);
    res.status(200).json({ message: '이메일 전송 성공' });
  } catch (err) {
    next(err);
  }
};
