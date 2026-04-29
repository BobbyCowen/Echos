# Echos monorepo structure v2

## apps/front
Expo / React Native frontend targeting mobile and web.

## apps/api
Backend API placeholder that will become the shared persistence layer for web and mobile.

## Why this pivot
The project now targets both web and mobile, so a shared API is preferred over a mobile-only local SQLite-first approach.
