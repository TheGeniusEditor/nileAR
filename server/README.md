# Hotel Finance Backend

Node.js + PostgreSQL backend for the Hotel Finance portal.

## Quick start
1. Copy `.env.example` to `.env` and fill in values.
2. Apply the schema in `sql/schema.sql` to your Neon database.
3. Install dependencies: `npm install`
4. Run dev server: `npm run dev`

## Auth endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`

Tokens:
- Access token in JSON response.
- Refresh token in an HttpOnly cookie (`refresh_token`).
