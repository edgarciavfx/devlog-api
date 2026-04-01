# Agent Guidelines for rest-api

## Project Overview

- **Type**: Node.js REST API with Express 5
- **Module System**: ESM (ES Modules) with `"type": "module"` in package.json
- **Database**: PostgreSQL with Drizzle ORM
- **Testing**: Jest (v30) with `--experimental-vm-modules`
- **Documentation**: Swagger UI at `/api-docs` endpoint

## Commands

### Running the Application

```bash
npm start              # Start production server (node src/index.js)
npm run dev           # Start development with nodemon (auto-reload)
```

### Running Tests

```bash
npm test              # Run all tests
npm test -- tests/auth.test.js    # Run single test file
npx jest tests/auth.test.js      # Alternative: run single file
npx jest --watch                 # Watch mode for development
```

### Database (Drizzle)

```bash
npx drizzle-kit generate         # Generate migrations
npx drizzle-kit push             # Push schema to DB
npx drizzle-kit studio           # Open DB GUI
```

## CLI Tools Available

| Category | Tools |
|----------|-------|
| Runtime | node (v22.22.2), npm (10.9.7), npx |
| Development | nodemon, jest, supertest |
| Database | psql (PostgreSQL CLI), drizzle-kit |
| Containers | docker, docker-compose |
| HTTP Clients | httpie, curl, wget |
| VCS | git, gh (GitHub CLI v2.89.0) |

## Code Style Guidelines

### File Organization

- Use `.js` extension for all files (ESM requirement)
- File naming: `camelCase` (e.g., `authController.js`, `errorHandler.js`)
- Directory structure:
  ```
  src/
  ├── controllers/   # Request handlers
  ├── routes/        # Express router definitions
  ├── middleware/    # Express middleware
  ├── db/            # Database schema and connection
  ├── repositories/  # Data access layer
  ├── utils/         # Utilities (auth, validation, logger)
  └── config/        # Configuration (swagger, etc.)
  tests/
  └── *.test.js      # Test files
  ```

### Import Conventions

- Use explicit `.js` extensions in imports: `import foo from './foo.js'`
- Order imports logically:
  1. Node built-ins (e.g., `path`, `crypto`)
  2. External packages (e.g., `express`, `dotenv`, `drizzle-orm`)
  3. Internal modules (e.g., `../utils/auth.js`)
- Use named exports where possible

```javascript
// Good
import express from 'express';
import { findUserByEmail } from '../repositories/userRepository.js';
import logger from '../utils/logger.js';

// Avoid
const express = require('express');
```

### Naming Conventions

- Variables/functions: `camelCase` (e.g., `hashPassword`, `authenticate`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `JWT_SECRET`, `SALT_ROUNDS`)
- Classes/Export defaults: `PascalCase` (e.g., `app` in index.js)
- Database tables/schema: `snake_case` (e.g., `users`, `created_at`)

### Express 5 Async Patterns

- Use async/await for all route handlers
- Express 5 automatically catches promise rejections - no manual `next(err)` needed
- Always wrap async operations in try/catch for logging purposes

```javascript
// Good
export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    // ... logic
    res.status(201).json({ message: 'User registered', userId: user.id });
  } catch (error) {
    logger.error({ message: 'Registration failed', error: error.message });
    res.status(500).json({ error: { message: 'Internal server error' } });
  }
};
```

### Error Handling

- Use Winston logger for structured logging
- Log errors with context: `{ message, error, userId, ... }`
- API error responses must follow format:
  ```javascript
  res.status(500).json({ error: { message: 'Human readable message' } });
  ```
- Global error handler in `src/middleware/errorHandler.js`

### Validation

- Use Zod for request body validation (in `src/utils/validation.js`)
- Validate in controller or middleware before business logic

### Database (Drizzle ORM)

- Schema defined in `src/db/schema.js`
- Use repositories pattern (`src/repositories/`) for data access
- Table/column names use `snake_case` in schema

```javascript
// Schema example
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

### API Response Format

- Success: `res.status(200).json({ ...data })`
- Created: `res.status(201).json({ message: '...', ...data })`
- Errors: `res.status(code).json({ error: { message: '...' } })`

### Testing

- Test files go in `tests/` directory
- Use `describe` and `it` blocks
- Use `supertest` for integration tests on Express routes
- Setup file: `tests/setup.js`

### JSDoc for Swagger

- Document routes with JSDoc comments (see `src/routes/auth.js` for example)
- Use `@summary`, `@tags`, `@param`, `@return` annotations

### General

- No TypeScript - plain JavaScript only
- No formatter/linter configured - use reasonable formatting
- Use JSDoc for public function documentation
- Environment variables: See `.env.example` (PORT, JWT_SECRET, DATABASE_URL, etc.)
- Keep functions small and focused
- Use const over let, avoid var