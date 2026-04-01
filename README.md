# REST API

Node.js + Express REST API with PostgreSQL, JWT authentication, and Swagger documentation.

## Features

- **Express** - Web framework
- **PostgreSQL + Drizzle ORM** - Database with type-safe queries
- **JWT + bcrypt** - Token-based authentication
- **Zod** - Request validation
- **Winston** - Logging
- **Swagger/OpenAPI** - API documentation

## Setup

```bash
npm install
```

## Database Setup

1. Create a PostgreSQL database
2. Copy `.env.example` to `.env` and update `DATABASE_URL`
3. Run migrations (requires Drizzle Kit):

```bash
npx drizzle-kit push
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload
- `npm test` - Run tests

## Environment Variables

```
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your-secret-key
JWT_EXPIRES=7d
```

## Structure

```
src/
├── config/         # Swagger configuration
├── controllers/   # Business logic
├── db/            # Drizzle connection and schema
├── middleware/    # Auth, error handling
├── repositories/  # Data access layer
├── routes/        # Route definitions
└── utils/         # Auth, logger, validation

tests/             # Test files
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and get JWT token |
| GET | `/health` | Health check |
| GET | `/api-docs` | Swagger documentation |

## Testing

Run tests:
```bash
npm test
```

## License

ISC