import { z } from 'zod';
import logger from './logger.js';

export const validateBody = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const messages = error.issues.map((e) => `${e.path.join('.')}: ${e.message}`);
    logger.warn({ message: 'Validation failed', path: req.path, details: messages });
    res.status(400).json({ error: { message: 'Validation failed', details: messages } });
  }
};

export const validateParams = (schema) => (req, res, next) => {
  try {
    schema.parse(req.params);
    next();
  } catch (error) {
    const messages = error.issues.map((e) => `${e.path.join('.')}: ${e.message}`);
    logger.warn({ message: 'Validation failed', path: req.path, details: messages });
    res.status(400).json({ error: { message: 'Validation failed', details: messages } });
  }
};

export const validateQuery = (schema) => (req, res, next) => {
  try {
    schema.parse(req.query);
    next();
  } catch (error) {
    const messages = error.issues.map((e) => `${e.path.join('.')}: ${e.message}`);
    logger.warn({ message: 'Validation failed', path: req.path, details: messages });
    res.status(400).json({ error: { message: 'Validation failed', details: messages } });
  }
};

export const exampleSchema = z.object({
  data: z.string().min(1, 'Data is required'),
});

export const idParamSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  username: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const createLogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be at most 255 characters'),
  content: z.string().min(1, 'Content is required'),
  tags: z.array(z.string()).optional(),
});

export const updateLogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be at most 255 characters').optional(),
  content: z.string().min(1, 'Content is required').optional(),
  tags: z.array(z.string()).optional(),
});

export const logQuerySchema = z.object({
  startDate: z.string().datetime({ message: 'Invalid ISO date format' }).optional(),
  endDate: z.string().datetime({ message: 'Invalid ISO date format' }).optional(),
  tags: z.string().optional(),
});
