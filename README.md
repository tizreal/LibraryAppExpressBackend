# Library Management System — Express API

REST API for a small library management system: create, list, update and delete books and
library members. It exposes the same endpoints and database schema as the
[Spring Boot version](https://github.com/tizreal/LibraryAppBackend), which the
[React frontend](https://github.com/tizreal/LibraryApp) is built against.

## Tech stack

Node.js · Express 4 · PostgreSQL (`pg` connection pool) · dotenv

## Design

- Layered structure: routes → services → repositories, with all SQL in the repository layer.
- Parameterized queries throughout (`$1`, `$2`, …), so user input is never concatenated into
  SQL.
- A shared connection pool (up to 10 connections) and a central error handler.
- CORS allows the local Vite dev server.

## API

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/books` | List books |
| `GET` | `/api/books/:id` | Get one book |
| `POST` | `/api/books` | Create a book |
| `PUT` | `/api/books/:id` | Update a book |
| `DELETE` | `/api/books/:id` | Delete a book |
| `GET` | `/api/users` | List members |
| `GET` | `/api/users/:id` | Get one member |
| `POST` | `/api/users` | Create a member |
| `PUT` | `/api/users/:id` | Update a member |
| `DELETE` | `/api/users/:id` | Delete a member |

## Running locally

Requirements: Node.js and a PostgreSQL database with the `books` and `users` tables (the
schema is in the [Spring Boot API's README](https://github.com/tizreal/LibraryAppBackend#data-model)).

```bash
npm install
cp .env.example .env    # set DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, PORT
npm run dev             # http://localhost:3000, restarts on changes (nodemon)
```

Use `npm start` to run without nodemon. The frontend can point at it with
`VITE_API_URL=http://localhost:3000`; books work fully, but the members username field is
`user_name` here and `user_name_string` in the Spring Boot API the frontend uses.

## Project structure

```
server.js              app setup, CORS, routes, error handler
src/
├── config/db.js       PostgreSQL connection pool
├── routes/            HTTP endpoints
├── services/          business logic
└── repositories/      SQL queries
```
