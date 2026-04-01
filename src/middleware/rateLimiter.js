import rateLimit from 'express-rate-limit';
import logger from '../utils/logger.js';

const isTest = process.env.NODE_ENV === 'test';

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: { message: 'Too many requests, please try again later.' } },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn({ message: 'Rate limit exceeded', ip: req.ip, path: req.path });
    res.status(429).json({ error: { message: 'Too many requests, please try again later.' } });
  },
  skip: () => isTest,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: { message: 'Too many attempts, please try again later.' } },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn({ message: 'Auth rate limit exceeded', ip: req.ip, path: req.path });
    res.status(429).json({ error: { message: 'Too many attempts, please try again later.' } });
  },
  skip: () => isTest,
});

export default rateLimiter;