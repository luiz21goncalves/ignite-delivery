import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { jwt } from '../config/auth';
import { AuthenticationError } from '../errors/AuthenticationError';

type IPayload = {
  sub: string;
};

export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AuthenticationError.TokenMissing();
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new AuthenticationError.TokenMissing();
  }

  try {
    const { sub } = verify(token, jwt.secret) as IPayload;

    request.user = { id: sub };

    return next();
  } catch (err) {
    throw new AuthenticationError.InvalidToken();
  }
}
