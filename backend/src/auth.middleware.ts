import type { NextFunction, Request, Response } from 'express';
import { prisma } from './database.js';
import { verifyAuthToken, type AuthClaims } from './security.js';

declare global {
  namespace Express {
    interface Request { auth?: AuthClaims; }
  }
}

export async function authMiddleware(request: Request, response: Response, next: NextFunction) {
  const token = request.cookies?.auth;
  if (!token) return response.status(401).json({ error: 'Unauthorized' });
  try {
    const claims = verifyAuthToken(token);
    const user = await prisma.user.findUnique({ where: { id: claims.userId }, select: { id: true, role: true, isActive: true } });
    if (!user || !user.isActive || user.role !== claims.role) return response.status(401).json({ error: 'Unauthorized' });
    request.auth = { userId: user.id, role: user.role };
    return next();
  } catch {
    return response.status(401).json({ error: 'Unauthorized' });
  }
}

export function roleMiddleware(...roles: AuthClaims['role'][]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.auth || !roles.includes(request.auth.role)) return response.status(403).json({ error: 'Forbidden' });
    return next();
  };
}
