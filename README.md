# REST API Starter

A clean, scalable, secure, and modern REST API starter template built with Node.js, Express, and PostgreSQL.

## Features

- **Express 5** - Modern async/await patterns
- **PostgreSQL + Drizzle ORM** - Type-safe database queries
- **JWT + bcrypt** - Secure token-based authentication
- **Zod** - Request validation with schemas
- **Winston** - Structured logging
- **Swagger/OpenAPI** - Interactive API documentation
- **Rate Limiting** - Brute force protection (10 requests/15min for auth)
- **CORS** - Configurable allowed origins
- **Jest** - Integration and unit tests with CI/CD

## Quick Start

```bash
# Clone and setup
npm install

# Create database
createdb my_db

# Copy environment file
cp .env.example .env

# Run migrations
npx drizzle-kit push

# Start development
npm run dev
```

## Environment Variables

```env
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your-secret-key
JWT_EXPIRES=7d
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

## Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development with hot reload |
| `npm test` | Run all tests |
| `npm test -- <file>` | Run single test file |
| `npx drizzle-kit studio` | Open database GUI |
| `node drizzle/seed.js` | Seed database with sample data |

## Project Structure

```
src/
├── config/          # Swagger configuration
├── controllers/     # Request handlers (business logic)
├── db/             # Drizzle schema and connection
├── middleware/     # Auth, rate limiting, error handling
├── repositories/   # Data access layer
├── routes/         # Express router definitions
└── utils/          # Auth, validation, logger, apiResponse

tests/
├── integration/    # HTTP integration tests
├── globalSetup.js  # Test database cleanup
├── globalTeardown.js # Server cleanup
└── *.test.js       # Test files
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and get JWT token |
| GET | `/health` | Health check |
| GET | `/api-docs` | Swagger documentation |

## Testing

```bash
# Run all tests
npm test

# Run single test file
npm test -- tests/integration/auth.test.js

# Watch mode
npx jest --watch
```

## CI/CD

GitHub Actions workflow is configured in `.github/workflows/ci.yml`:
- Runs on push/PR to `main` branch
- Spins up PostgreSQL container
- Generates and pushes migrations
- Runs all tests

## Security Features

- **Rate Limiting**: 100 requests/15min general, 10 requests/15min for auth
- **CORS**: Restricts origins via `ALLOWED_ORIGINS` env variable
- **Request Size**: Limited to 10kb to prevent payload attacks
- **Password Hashing**: bcrypt with configurable salt rounds
- **JWT**: Token-based auth with expiration

## Extending the API

1. **Add new entity**: Create schema in `src/db/schema.js`, add repository, controller, and routes
2. **Add validation**: Define Zod schema in `src/utils/validation.js`
3. **Add tests**: Create test file in `tests/integration/`

## License

ISC