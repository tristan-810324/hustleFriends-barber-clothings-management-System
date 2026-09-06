import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { config } from './config.js';

export type AuthClaims = { userId: string; role: 'CLIENT' | 'STAFF' | 'OWNER' };

export const hashSecret = (value: string) => bcrypt.hash(value, 12);
export const compareSecret = (value: string, hash: string) => bcrypt.compare(value, hash);
export const createOtp = () => crypto.randomInt(100000, 1000000).toString();
export const createToken = () => crypto.randomBytes(32).toString('hex');
export const hashToken = (value: string) => crypto.createHash('sha256').update(value).digest('hex');
export const signAuthToken = (claims: AuthClaims) => jwt.sign(claims, config.JWT_SECRET, { expiresIn: '1d' });
export const verifyAuthToken = (token: string) => jwt.verify(token, config.JWT_SECRET) as AuthClaims;
