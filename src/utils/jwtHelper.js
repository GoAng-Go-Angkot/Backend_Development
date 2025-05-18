import jwt from 'jsonwebtoken';
import { JWT_SECRET_CLIENT, JWT_SECRET_DRIVER } from '../config/env.js';

export function generateTokenDriver(email, route) {
  return jwt.sign({email, route}, JWT_SECRET_DRIVER, {
    expiresIn: '30days',
    algorithm: 'HS384'
  });
}

export function verifyTokenDriver(token) {
  return jwt.verify(token, JWT_SECRET_DRIVER, {
    algorithms: ['HS384']
  });
}
export function generateTokenClient(email) {
  return jwt.sign({email}, JWT_SECRET_CLIENT, {
    expiresIn: '30days',
    algorithm: 'HS384'
  });
}

export function verifyTokenClient(token) {
  return jwt.verify(token, JWT_SECRET_CLIENT, {
    algorithms: ['HS384']
  });
}