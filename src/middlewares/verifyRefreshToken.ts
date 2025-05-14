import { expressjwt } from 'express-jwt';
import { Secret } from 'jsonwebtoken';
import { jwtSecret } from '../config';

export const verifyRefreshToken = expressjwt({
  secret: jwtSecret as Secret,
  algorithms: ['HS256'],
  requestProperty: 'user',
  getToken: (req) => req.body.refresh,
});
