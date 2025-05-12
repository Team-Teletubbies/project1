import jwt from 'jsonwebtoken';

export const createToken = (userId: number, type?: 'access' | 'refresh'): string => {
  const options = {
    expiresIn: type === 'refresh' ? '2w' : '1h',
    algorithm: 'HS256' as const,
  };

  return jwt.sign({ userId }, process.env.JWT_SECRET as jwt.Secret, options as jwt.SignOptions);
};
