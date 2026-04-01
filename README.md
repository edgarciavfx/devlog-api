# DevLog API

A REST API for developer daily logs - track wins, knowledge, and code snippets. Perfect for junior developers wanting to document their learning journey.

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
- **Tags** - Organize logs with tags (Obsidian-style)

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

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and get JWT token |

### Logs (Requires JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/logs` | Create a new log entry |
| GET | `/logs` | Get all logs (supports filters) |
| GET | `/logs/week/recent` | Get last 7 days of logs |
| GET | `/logs/:id` | Get single log by ID |
| PUT | `/logs/:id` | Update log entry |
| DELETE | `/logs/:id` | Delete log entry |

### Utility

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api-docs` | Swagger documentation |

## Log API Usage

### Create a Log

```bash
curl -X POST http://localhost:3000/logs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Fixed production bug",
    "content": "Fixed a memory leak in the user service caused by improper event listener cleanup.",
    "tags": ["win", "bugfix", "performance"]
  }'
```

### Get All Logs (with optional filters)

```bash
# All logs
curl http://localhost:3000/logs \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Filter by date range
curl "http://localhost:3000/logs?startDate=2026-01-01T00:00:00Z&endDate=2026-01-31T23:59:59Z" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Filter by tags
curl "http://localhost:3000/logs?tags=win,learning" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Recent Week Logs

```bash
curl http://localhost:3000/logs/week/recent \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update a Log

```bash
curl -X PUT http://localhost:3000/logs/LOG_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Updated title",
    "tags": ["win", "updated"]
  }'
```

### Delete a Log

```bash
curl -X DELETE http://localhost:3000/logs/LOG_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Log Schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique log identifier |
| `userId` | UUID | Owner user ID |
| `title` | String | Log title (max 255 chars) |
| `content` | Text | Log content/body |
| `tags` | JSON Array | Array of tag strings |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

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

## Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development with hot reload |
| `npm test` | Run all tests |
| `npm test -- <file>` | Run single test file |
| `npx drizzle-kit studio` | Open database GUI |
| `node drizzle/seed.js` | Seed database with sample data |

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
- **Private Logs**: Users can only access their own logs

## License

MIT
