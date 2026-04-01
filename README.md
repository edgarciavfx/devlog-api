# REST API

Node.js + Express REST API scaffold.

## Setup

```bash
npm install
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server
- `npm test` - Run tests

## Structure

```
src/
├── controllers/   # Business logic
├── middleware/   # Custom middleware
├── models/       # Data models
└── routes/       # Route definitions

tests/            # Test files
```

## Environment

Copy `.env.example` to `.env` and configure:

```
PORT=3000
NODE_ENV=development
```
