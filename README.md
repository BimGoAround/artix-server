# Artix Server

The server for Artix application.

This is a project built with NestJS, Prisma, PostgreSQL, and Docker.

## Prerequisites

- Node.js
- Prisma
- Docker
- Docker Compose

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/BimGoAround/artix-server.git
```

2. Navigate to the project directory:

```bash
cd artix-server
```

3. Install the dependencies:

```bash
npm install
```

4. Copy the .env.example file and create a new .env file:

```bash
cp .env.example .env
```

5. Update the .env file with your database credentials.

6. Run the PostgreSQL database with Docker Compose:

```bash
docker-compose up -d
```

7. Run the Prisma migrations to create the database schema:

```bash
npm run prisma:migrate
```

8. Seed the database: (Optional)

```bash
npx prisma db seed
```

9. Start the server:

```bash
npm run start:dev
```

10. The server will be running on http://localhost:3000.

## API Documentation

The API documentation is available at http://localhost:3000/api.
