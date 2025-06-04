# User Service Node.js + TypeScript

This project is a boilerplate for a user service API built with Node.js, TypeScript, Express, Sequelize, and JWT authentication. It follows a modern, scalable folder structure and includes Swagger API documentation and unit testing with Jest.

## Folder Structure
- `src/` – Main source code (entry: `src/index.ts`)
  - `config/` – Configuration files (e.g., database)
  - `controllers/` – Express route controllers
  - `middlewares/` – Express middlewares
  - `models/` – Sequelize models and data types
  - `routes/` – Route handlers (Express routers)
  - `services/` – Business logic and service classes
  - `types/` – Custom TypeScript types
  - `utils/` – Utility/helper functions (e.g., JWT helpers)
- `tests/` – Test files (organized by feature)
- `dist/` – Compiled JavaScript output (after build)

## Features
- User registration and login with hashed passwords
- JWT-based authentication
- Sequelize ORM with MySQL
- Environment variable support via `.env`
- API documentation with Swagger (`/api/docs`)
- Unit testing with Jest

## Scripts
- `npm run build` – Compile TypeScript to JavaScript (output in `dist/`)
- `npm start` – Run the compiled app
- `npm run dev` – Start the app in development mode with hot reload (nodemon + ts-node)
- `npm test` – Run all Jest tests with coverage

## Development
- Edit code in `src/`.
- Use VS Code tasks or npm scripts to build and run the project.
- API docs available at `http://localhost:<PORT>/api/docs` after running the server.

## Getting Started
1. `npm install`
2. Create a `.env` file with your environment variables (see below)
3. `npm run build`
4. `npm start` or `npm run dev`

## Example `.env` file
```
PORT=3000
DB_NAME=your_db
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
```

## Testing
- Place test files in the `tests/` directory.
- Run `npm test` to execute all tests and view coverage.

---

Feel free to extend this boilerplate for your own user service needs!
