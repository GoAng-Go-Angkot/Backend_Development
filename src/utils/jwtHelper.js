import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

export function generateToken(email, route) {
  return jwt.sign({email, route}, JWT_SECRET, {
    expiresIn: '30days',
    algorithm: 'HS384'
  });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET, {
    algorithms: ['HS384']
  });
}