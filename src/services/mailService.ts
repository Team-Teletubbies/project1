import nodemailer from 'nodemailer';
import { MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_USER } from '../lib/constants';
import { MailContent, SenderEmailInfo } from '../dto/memberDTO';

const infoEmail: SenderEmailInfo = {
  host: MAIL_HOST,
  port: parseInt(MAIL_PORT, 10),
  secure: false,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
};

export const sendEmail = async (data: MailContent): Promise<void> => {
  const transporter = nodemailer.createTransport(infoEmail);

  try {
    const info = await transporter.sendMail(data);
    console.log('이메일 전송에 성공했습니다', info.messageId);
  } catch (error) {
    console.error('이메일 전송에 실패했습니다', error);
    throw new Error('메일 발송 중 문제가 발생했습니다.');
  }
};
