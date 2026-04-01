import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

export default async function globalSetup() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/my_db_test',
  });

  await client.connect();
  await client.query('DELETE FROM users');
  await client.end();
}