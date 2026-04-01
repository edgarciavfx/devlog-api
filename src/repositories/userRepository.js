import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const findUserByEmail = async (email) => {
  return db.select().from(users).where(eq(users.email, email)).limit(1);
};

export const findUserById = async (id) => {
  return db.select().from(users).where(eq(users.id, id)).limit(1);
};

export const createUser = async (userData) => {
  return db.insert(users).values(userData).returning();
};

export const updateUser = async (id, data) => {
  return db.update(users).set(data).where(eq(users.id, id)).returning();
};

export const deleteUser = async (id) => {
  return db.delete(users).where(eq(users.id, id)).returning();
};