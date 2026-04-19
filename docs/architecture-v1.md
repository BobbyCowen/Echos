# Echos architecture v1

## Goal
Provide a clean project structure for the MVP without over-engineering.

## Main folders
- `app/`: Expo Router routes and screens
- `src/components/`: reusable UI and domain-oriented presentational components
- `src/features/`: feature-oriented logic grouped by domain
- `src/lib/`: shared technical building blocks (db, validation, utilities)
- `src/stores/`: UI or app-level stores when needed
- `src/constants/`: shared constants and enums-like values
- `docs/`: lightweight project documentation

## Current feature split
- `entries`: journal entries domain
- `media`: media attached to entries
- `tags`: tag management

## Intent
Keep screens thin, avoid mixing persistence with UI, and prepare the codebase for the next sprint tasks.
