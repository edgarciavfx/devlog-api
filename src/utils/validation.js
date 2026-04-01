import { z } from 'zod';

export const validateBody = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const messages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
    res.status(400).json({ error: { message: 'Validation failed', details: messages } });
  }
};

export const validateParams = (schema) => (req, res, next) => {
  try {
    schema.parse(req.params);
    next();
  } catch (error) {
    const messages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
    res.status(400).json({ error: { message: 'Validation failed', details: messages } });
  }
};

export const validateQuery = (schema) => (req, res, next) => {
  try {
    schema.parse(req.query);
    next();
  } catch (error) {
    const messages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
    res.status(400).json({ error: { message: 'Validation failed', details: messages } });
  }
};

export const exampleSchema = z.object({
  data: z.string().min(1, 'Data is required'),
});

export const idParamSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
});
