import { generateToken } from '../lib/utils/invitationToken';
import * as invitationRepository from '../repositories/invitationRepository';
import { sendEmail } from './mailService';

export const inviteMember = async function (
  email: string,
  projectId: number,
  inviterId: number,
  isAccepted = false,
) {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

  await invitationRepository.createInvitation(
    email,
    projectId,
    inviterId,
    token,
    isAccepted,
    expiresAt,
  );

  const inviteUrl = `https://moon-shot.com/invite?token=${token}`;

  await sendEmail({
    from: 'minso0317@naver.com',
    to: email,
    subject: 'moon-shot에 초대합니다.',
    text: `프로젝트 초대링크는 ${inviteUrl} 입니다.`,
  });
};
