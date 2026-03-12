# UrbanAlert

UrbanAlert is a small backend service for reporting incidents and managing users. It provides JWT-based authentication and persistent storage using MongoDB.

## Installation

1. Clone the repository
2. Copy `.env.template` to `.env` and fill the values

```bash
npm install
cp .env.template .env
# edit .env with your MONGO_URI and JWT_SECRET
node index.js
```

## Technologies

- Node.js
- Express
- MongoDB (mongoose)
- JSON Web Tokens (`jsonwebtoken`)

## Folder Structure (N-Layer pattern)

- `src/routes` - HTTP route definitions
- `src/controllers` - Request handlers / business logic
- `src/models` - Mongoose models
- `src/middlewares` - Authentication and middleware
- `src/config` - DB connection and configuration

## Main Endpoints

Auth:
- POST `/api/auth/register` — register a user (body: `email`, `password`)
- POST `/api/auth/login` — login and obtain JWT (body: `email`, `password`)
- GET `/api/auth/users` — list users (protected, needs `Authorization: Bearer <token>`)
- GET `/api/auth/users/:id` — get user by id (protected)

Reports (example routes already present):
- GET `/api/reportes/reportes` — protected
- POST `/api/reportes/CreateReporte` — protected

## Notes

- Do not commit real credentials. Use `.env.template` for examples.
- Token expiration: 1 hour (configured in `src/helpers/help.js`).
