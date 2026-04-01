import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateBody } from '../utils/validation.js';
import { registerSchema, loginSchema } from '../utils/validation.js';

const router = express.Router();

/**
 * POST /auth/register
 * @summary Register a new user
 * @tags Auth
 * @param {object} request.body.required - User registration data
 * @property {string} request.body.email - User email
 * @property {string} request.body.password - User password
 * @property {string} request.body.username - Optional username
 * @return {object} 201 - User created successfully
 * @return {object} 400 - Validation error or email already exists
 * @return {object} 500 - Internal server error
 */
router.post('/register', validateBody(registerSchema), register);

/**
 * POST /auth/login
 * @summary Login user
 * @tags Auth
 * @param {object} request.body.required - User login credentials
 * @property {string} request.body.email - User email
 * @property {string} request.body.password - User password
 * @return {object} 200 - Login successful, returns JWT token
 * @return {object} 401 - Invalid credentials or account inactive
 * @return {object} 400 - Missing required fields
 * @return {object} 500 - Internal server error
 */
router.post('/login', validateBody(loginSchema), login);

export default router;