import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authconfig from '../config/authconfig';

interface ITokenPayload {
  sub: string;
}

export default function ensureAuthenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    throw new Error('JWT is missing');
  }

  const [, token] = authHeaders.split(' ');

  try {
    const { sub } = verify(token, authconfig.secretKey) as ITokenPayload;

    req.user_id = sub;

    return next();
  } catch {
    throw new Error('Essa operação não pode ser finalizada');
  }
}
