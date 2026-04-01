import express from 'express';
import { hashPassword, comparePassword, generateToken, findUserByEmail, createUser } from '../utils/auth.js';
import logger from '../utils/logger.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const existing = await findUserByEmail(email);
    if (existing.length > 0) {
      return res.status(400).json({ error: { message: 'Email already registered' } });
    }

    const hashedPassword = await hashPassword(password);
    const [user] = await createUser({
      email,
      password: hashedPassword,
      username,
      isActive: true,
    });

    logger.info({ message: 'User registered', userId: user.id, email: user.email });
    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    logger.error({ message: 'Registration failed', error: error.message });
    res.status(500).json({ error: { message: 'Internal server error' } });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await findUserByEmail(email);
    if (!user) {
      logger.warn({ message: 'Login failed: user not found', email });
      return res.status(401).json({ error: { message: 'Invalid credentials' } });
    }

    if (!user.isActive) {
      logger.warn({ message: 'Login failed: account inactive', email });
      return res.status(401).json({ error: { message: 'Account is inactive' } });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      logger.warn({ message: 'Login failed: invalid password', email });
      return res.status(401).json({ error: { message: 'Invalid credentials' } });
    }

    const token = generateToken({ id: user.id, email: user.email });
    logger.info({ message: 'User logged in', userId: user.id });
    res.json({ token });
  } catch (error) {
    logger.error({ message: 'Login failed', error: error.message });
    res.status(500).json({ error: { message: 'Internal server error' } });
  }
});

export default router;