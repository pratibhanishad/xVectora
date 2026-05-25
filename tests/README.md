# Architecture & Lint Tests

## How to Run

### Architecture Tests
node tests/architecture.test.js

### Lint Tests
npx eslint packages/domain/src/**/*.js

## What These Tests Check
- Domain layer must not import any frameworks (express, fastapi, flask)
- Domain layer must not import infrastructure packages (mongoose, sequelize, prisma, axios)
- Keeps domain layer clean and framework-free

