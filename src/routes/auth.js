import express from 'express';
import { register, login } from '../controllers/authController.js';

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
router.post('/register', register);

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
router.post('/login', login);

export default router;