import { db } from '../db/index.js';
import { logs } from '../db/schema.js';
import { eq, and, gte, lte, asc } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

export const createLog = async (userId, data) => {
  return db.insert(logs).values({
    userId,
    title: data.title,
    content: data.content,
    tags: data.tags || [],
  }).returning();
};

export const getLogById = async (id, userId) => {
  return db.select().from(logs).where(and(eq(logs.id, id), eq(logs.userId, userId))).limit(1);
};

export const getLogsByUser = async (userId, options = {}) => {
  const { startDate, endDate, tags } = options;

  const conditions = [eq(logs.userId, userId)];

  if (startDate) {
    conditions.push(gte(logs.createdAt, new Date(startDate)));
  }
  if (endDate) {
    conditions.push(lte(logs.createdAt, new Date(endDate)));
  }
  if (tags && tags.length > 0) {
    const tagArray = tags.map(t => t.trim());
    conditions.push(sql`${logs.tags} ?| array[${tagArray.map(t => sql`${t}`)}]`);
  }

  return db.select().from(logs).where(and(...conditions)).orderBy(asc(logs.createdAt));
};

export const getRecentWeekLogs = async (userId) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return db
    .select()
    .from(logs)
    .where(and(eq(logs.userId, userId), gte(logs.createdAt, sevenDaysAgo)))
    .orderBy(asc(logs.createdAt));
};

export const updateLog = async (id, userId, data) => {
  const updateData = { ...data, updatedAt: new Date() };
  return db.update(logs).set(updateData).where(and(eq(logs.id, id), eq(logs.userId, userId))).returning();
};

export const deleteLog = async (id, userId) => {
  return db.delete(logs).where(and(eq(logs.id, id), eq(logs.userId, userId))).returning();
};
