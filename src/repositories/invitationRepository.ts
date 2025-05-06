import { prisma } from '../lib/prisma';

export async function createInvitation(
  invitedEmail: string,
  projectId: number,
  inviterId: number,
  token: string,
  isAccepted: boolean,
  expiresAt: Date,
) {
  return await prisma.invitation.create({
    data: {
      invitedEmail,
      projectId,
      inviterId,
      token,
      isAccepted,
      expiresAt,
    },
  });
}

export async function findInvitationByToken(token: string) {
  return prisma.invitation.findUnique({
    where: {
      token,
    },
  });
}
