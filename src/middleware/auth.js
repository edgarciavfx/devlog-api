import { verifyToken } from '../utils/auth.js';
import logger from '../utils/logger.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.warn({ message: 'Missing or invalid auth token', path: req.path });
    return res.status(401).json({ error: { message: 'Unauthorized: No token provided' } });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    logger.warn({ message: 'Invalid auth token', path: req.path, error: error.message });
    return res.status(401).json({ error: { message: 'Unauthorized: Invalid token' } });
  }
};