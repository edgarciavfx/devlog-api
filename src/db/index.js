import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import logger from '../utils/logger.js';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);

export const testConnection = async () => {
  try {
    const client = await pool.connect();
    client.release();
    logger.info('Database connected successfully');
    return true;
  } catch (error) {
    logger.error('Database connection failed', { error: error.message });
    return false;
  }
};