# Local PostgreSQL with Docker

## Start PostgreSQL
```bash
npm run db:up
```

## Watch logs
```bash
npm run db:logs
```

## Stop containers
```bash
npm run db:down
```

## Prisma
Generate the client:
```bash
npm run api:prisma:generate
```

Run dev migrations:
```bash
npm run api:prisma:migrate:dev
```

## Default local connection
`apps/api/.env`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/echos?schema=public"
```
