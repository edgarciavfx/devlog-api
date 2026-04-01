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
