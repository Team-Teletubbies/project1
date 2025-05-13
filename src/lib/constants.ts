import dotenv from 'dotenv';
dotenv.config({ debug: true, path: '.env' });

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`환경변수 ${key}가 설정되어 있지 않았습니다`);
  }
  return value;
}

export const MAIL_HOST = getEnv('MAIL_HOST');
export const MAIL_PORT = getEnv('MAIL_PORT');
export const MAIL_USER = getEnv('MAIL_USER');
export const MAIL_PASS = getEnv('MAIL_PASS');

export const { PORT } = process.env;
