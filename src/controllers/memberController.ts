import { NextFunction, Request, Response } from 'express';
import { inviteMember } from '../services/memberService';

export const sendInvitationEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, projectId, inviterId } = req.body;
    const data = { email, projectId };
    if (!data) {
      res.status(400).json({ message: '모든 필들를 입력해 주세요' });
      return;
    }

    await inviteMember(email, projectId, inviterId);
    res.status(200).json({ message: '초대 메일이 성공적으로 전송되었습니다.' });
  } catch (err) {
    next(err);
  }
};
