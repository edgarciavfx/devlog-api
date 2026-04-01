import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';
const SALT_ROUNDS = 10;

export const hashPassword = async (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export const findUserByEmail = async (email) => {
  return db.select().from(users).where(eq(users.email, email)).limit(1);
};

export const createUser = async (userData) => {
  return db.insert(users).values(userData).returning();
};