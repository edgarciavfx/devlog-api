import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { users } from '../src/db/schema.js';
import { hashPassword } from '../src/utils/auth.js';

const db = drizzle(process.env.DATABASE_URL);

async function seed() {
  console.log('Seeding users table...');

  const hashedPassword = await hashPassword('password123');

  await db.insert(users).values([
    {
      email: 'admin@example.com',
      password: hashedPassword,
      username: 'admin',
      isActive: true,
    },
    {
      email: 'test@example.com',
      password: hashedPassword,
      username: 'testuser',
      isActive: true,
    },
    {
      email: 'john@example.com',
      password: hashedPassword,
      username: 'john_doe',
      isActive: true,
    },
  ]).onConflictDoNothing();

  console.log('Users seeded successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});