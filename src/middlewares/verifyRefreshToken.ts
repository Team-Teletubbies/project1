import { expressjwt } from 'express-jwt';
import { Secret } from 'jsonwebtoken';
import { jwtSecret } from '../config';

export const verifyRefreshToken = expressjwt({
  secret: jwtSecret as Secret,
  algorithms: ['HS256'],
  requestProperty: 'user',
  getToken: (req) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    return token;
  },
});
