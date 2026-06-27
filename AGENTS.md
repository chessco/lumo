# AGENTS.md — Lumo

> **Lumo** is an AI-powered educational platform for children focused on speech and pronunciation improvement.

*Note: For UI/UX and styling guidelines, please read `.agents/DESIGN.md` before making frontend changes.*

---

# Product Philosophy

Lumo is **NOT**:

* a generic learning management system
* a speech therapy replacement
* a social media platform
* a gaming platform

Lumo **IS**:

* an AI-powered educational platform for children
* a speech and pronunciation improvement tool
* a gamified learning experience
* the second official vertical of PitayaCore

Every implementation must answer one question:

> **Does this help children improve their speech and pronunciation in a fun and safe way?**

If the answer is **No**, reconsider the implementation.

---

# Core Principles

Always follow these principles.

## Child Safety First

Every feature must be emotionally and psychologically safe for children.

No negative feedback. Always encourage.

No exposure to inappropriate content.

---

## Fun and Engaging

Learning should feel like play.

Gamification drives motivation.

Progress must be visible and rewarding.

---

## Reuse Before Building

Before implementing a feature ask:

* Can PitayaCore already do this?
* Can another vertical reuse this?
* Should this become part of PitayaCore?

If yes:

Implement it in PitayaCore.

---

## Platform First

PitayaCore is the platform.

Lumo is a vertical.

Lumo consumes capabilities.

PitayaCore owns business logic.

---

# Architecture

```
Lumo React (PWA)

        │

        ▼

Lumo API (NestJS)

        │

        ▼

PitayaCore API

        │

        ▼

Agents

AI

Memory

Media

Knowledge

Notifications

Files

Audit
```

---

# Quick Start

```bash
# API (NestJS :3017)
cd api
npm install
npm run start:dev

# Web (Vite :3000, proxies /api → :3017)
cd web
npm install
npm run dev
```

Build & verify:
```bash
cd api
npm run build        # nest build
npm run lint         # eslint --fix
npm run test         # jest

cd web
npm run build        # tsc -b && vite build
```

Prisma:
```bash
cd api
npx prisma generate
npx prisma db push
npm run prisma:seed
```

Dev launcher (Windows):
```powershell
.\dev.ps1   # Starts API + Web in separate PowerShell windows
```

---

# Architecture

```
web (:3000) ──Vite proxy──▶ api (:3017) ──POST──▶ PitayaCore (remote)
                             │                      pitayacore-api.pitayacode.io
                             │                      /auth/*
                             │                      /ai/*
                             │                      /agents/*
                             ├─ MySQL (lumo)        /memory/*
                             └─ (no Postgres)       /media/*
                                                    /notifications/*
                                                    /knowledge/*
                                                    /files/*
                                                    /audit/*
```

- **web/**: React + Vite + Tailwind + ShadCN. Proxies `/api` requests to NestJS on `:3017`.
- **api/**: NestJS monolith. Modules: `auth`, `organizations`, `users`, `children`, `speech`, `lumi`.
- **Docker**: `docker-compose.yml` uses external `pitayacode_net` network (shared with PitayaCore stack).

---

# Multi-Tenancy — CRITICAL

Lumo uses **Option 3 multi-tenant architecture** with `tenant_id` throughout the system.

**Every table** includes `tenant_id` as a foreign key to `organizations`.

**Every request** needs `x-tenant-id` header.

`TenantMiddleware` uses `AsyncLocalStorage` to store tenant ID per request.

`getTenantId()` throws if called without tenant context.

`TenantOwnershipGuard` validates that the user belongs to the tenant.

---

# PitayaCore Integration — CRITICAL

**Lumo NEVER accesses PitayaCore databases directly.**

**Lumo ONLY communicates via REST APIs.**

**Always use production as default:** `https://pitayacore-api.pitayacode.io`

## API Clients

| Client | Endpoint | Purpose |
|--------|----------|---------|
| `AuthClient` | `/auth/*` | User authentication and authorization |
| `AiClient` | `/ai/*` | AI services (speech analysis, text generation) |
| `AgentClient` | `/agents/*` | Conversational AI agents (Lumi) |
| `MemoryClient` | `/memory/*` | User memory storage |
| `MediaClient` | `/media/*` | Audio and media file management |
| `NotificationClient` | `/notifications/*` | Push notifications |
| `KnowledgeClient` | `/knowledge/*` | Knowledge base queries |
| `FileClient` | `/files/*` | File storage and retrieval |
| `AuditClient` | `/audit/*` | Audit logging |

## Authentication

Internal API calls use `x-api-key` header with `INTERNAL_API_KEY` env var.

Current value: `pitaya_internal_secret_2026`

Source: `api/src/integrations/pitayacore/`

---

# Environment Variables

**API** (`api/.env`):
| Variable | Value |
|----------|-------|
| `DATABASE_URL` | MySQL — `lumo` |
| `JWT_SECRET` | `pitaya_secret_prod_key` |
| `PITAYACORE_URL` | `https://pitayacore-api.pitayacode.io` |
| `INTERNAL_API_KEY` | `pitaya_internal_secret_2026` |
| `PORT` | `3017` |

**Web** (`web/.env`):
| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `http://localhost:3017` |

**Docker-compose** reads from `api/.env.prod` and expects `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`.

---

# Port Map

| Service | Local (direct) | Docker | Production |
|---|---|---|---|
| API (NestJS) | 3017 | 3017 | `lumo-api.pitayacode.io` |
| Web (Vite) | 3000 | 3000 | `lumo.pitayacode.io` |
| MySQL | 3306 | 3306 | `pitaya-mysql-prod:3306` |

---

# Database

Single database: **MySQL 8** (`lumo`)

No PostgreSQL. No pgvector. All vector operations go through PitayaCore.

Container: `pitayacore-mysql` (shared with PitayaCore)

Connection: `mysql://root:acuacore_pass@localhost:3306/lumo` (local)

---

# Database Names

| DB | Local | Production |
|---|---|---|
| MySQL | `lumo` | `lumo` |

---

# API Modules

## Core Modules

| Module | Purpose |
|--------|---------|
| `AuthModule` | JWT authentication, login, register |
| `OrganizationsModule` | Multi-tenant organization management |
| `UsersModule` | User profiles and management |
| `ChildrenModule` | Child profile management |
| `SpeechModule` | Lumo Speak - sessions, exercises, phonemes, progress, rewards |
| `LumiModule` | AI companion - chat, greetings, feedback, encouragement |
| `PitayaCoreModule` | Integration clients for PitayaCore APIs |

## Global Modules

`DatabaseModule`, `AuthModule` — injectable anywhere without import.

---

# Lumo Speak Module

The core feature of Lumo.

## Tables

| Table | Purpose |
|-------|---------|
| `speech_sessions` | Practice sessions |
| `speech_exercises` | Exercises (vowels, consonants, words, sentences) |
| `phonemes` | Phoneme definitions (IPA symbols) |
| `phoneme_attempts` | Individual pronunciation attempts with scores |
| `audio_recordings` | Audio recordings from sessions |
| `speech_progress` | Daily progress summaries |
| `speech_rewards` | Badges and achievements |

## Features

* Speech recording
* Speech playback
* Pronunciation scoring (via PitayaCore AI)
* Progress tracking
* Gamification (levels, experience, streaks, badges)
* Child profiles

---

# Lumi — AI Companion

The first AI companion in Lumo.

## Personality Traits

* friendly
* encouraging
* patient
* playful
* educational
* emotionally safe

## Capabilities

* greet children
* explain exercises
* celebrate progress
* encourage repetition
* provide positive feedback

## Rules

* NEVER give negative feedback
* ALWAYS encourage and celebrate
* Use age-appropriate language
* Use emojis to make conversations fun
* Keep responses short and engaging

Source: `api/src/modules/lumi/lumi.service.ts`

---

# Commands

### API (`cd api`)
```bash
npm run start:dev    # NestJS watch mode (port 3017)
npm run build        # nest build
npm run lint         # eslint "{src,apps,libs,test}/**/*.ts" --fix
npm run test         # jest (unit tests, *.spec.ts)
npm run test:e2e     # jest --config ./test/jest-e2e.json
npm run test:cov     # jest --coverage
npm run format       # prettier --write
npm run prisma:generate  # prisma generate
npm run prisma:push      # prisma db push
npm run prisma:seed      # ts-node prisma/seed.ts
```

### Web (`cd web`)
```bash
npm run dev          # Vite dev server on port 3000
npm run build        # tsc -b && vite build (typecheck then build)
npm run lint         # eslint .
```

### Docker (from root)
```bash
docker compose up -d                  # Start all services
docker compose down                   # Stop all services
docker compose logs -f                # View logs
```

### Dev launcher (Windows)
```powershell
.\dev.ps1   # Starts API + Web in separate PowerShell windows
```

---

# Environment Files

| File | Purpose |
|---|---|
| `api/.env` | Local dev |
| `api/.env.prod` | Production config |
| `web/.env` | `VITE_API_URL=http://localhost:3017` |
| `web/.env.production` | `VITE_API_URL=https://lumo-api.pitayacode.io` |
| `.env` | Root: PitayaCore integration URLs |

---

# Seed Files

| File | Purpose |
|---|---|
| `prisma/seed.ts` | Admin user, organization, phonemes, exercises |

Default admin: `admin@lumo.com` / `admin123`

Default organization: `lumo-default`

---

# Deployment

## Development

```powershell
.\dev.ps1
```

## Production

```bash
docker compose build
docker compose up -d
```

## Docker

| Container | Port | Network |
|-----------|------|---------|
| `lumo-api` | 3017 | `pitayacode_net` |
| `lumo-web` | 3000 | `pitayacode_net` |

Network: `pitayacode_net` (external, shared with PitayaCore)

---

# Current Infra

| Area | Local | Production |
|---|---|---|
| API host | `localhost:3017` | `lumo-api.pitayacode.io` |
| Web host | `localhost:3000` | `lumo.pitayacode.io` |
| API container | `lumo-api` | `lumo-api` |
| Web container | `lumo-web` | `lumo-web` |
| MySQL container | `pitayacore-mysql` | `pitaya-mysql-prod` |
| MySQL database | `lumo` | `lumo` |
| Docker network | `pitayacode_net` | `pitayacode_net` |

---

# Web Architecture

- **Centralized API client**: `web/src/utils/api.ts` with axios interceptors
- **State**: `localStorage` for auth/tenant persistence. TanStack React Query for server state.
- **Routing**: React Router with protected routes and tenant guard
- **PWA**: Full service worker via `vite-plugin-pwa`, auto-update
- **i18n**: Spanish hardcoded (future: i18n support)
- **Component library**: ShadCN UI with custom Lumo theme

---

# Prisma Workflow

```bash
cd api
npx prisma generate                    # Generate Prisma client
npx prisma db push                     # Push schema to database
npx ts-node prisma/seed.ts             # Seed database
```

Single schema: `prisma/schema.prisma`

Custom output: Standard `@prisma/client`

---

# Testing

- **API unit tests**: `*.spec.ts` alongside source (jest + ts-jest)
- **API E2E**: `test/*.e2e-spec.ts` (supertest)
- **Web**: Not yet implemented (future: vitest)
- **Test command order**: `npm run lint` (eslint) → `npm run test` (jest)

---

# Quirks & Gotchas

1. **Single Prisma schema**: Only MySQL, no PostgreSQL. All vector operations go through PitayaCore.
2. **Shared MySQL container**: Uses `pitayacore-mysql` — do NOT restart or modify it.
3. **External Docker network**: `pitayacode_net` must exist before running docker-compose.
4. **`strictNullChecks: false`** and `noImplicitAny: false` in API tsconfig — lenient TypeScript.
5. **`dev.ps1` opens separate PowerShell windows** — not suitable for headless/CI environments.
6. **Global middleware** (`TenantMiddleware`) on ALL routes — even public endpoints receive it, but `getTenantId()` only throws if called without context.
7. **Prisma binary**: If `npx prisma` doesn't work, use `node node_modules/prisma/build/index.js` directly.
8. **No WebSocket**: Lumo doesn't use WebSocket currently (future: real-time speech feedback).

---

# Security

* JWT authentication with 1-day expiry
* API key for PitayaCore integration
* bcrypt password hashing
* Tenant data isolation
* Input validation with class-validator
* Rate limiting (100 req/60s)
* CORS configuration

Never commit:

* API Keys
* Tokens
* Passwords
* Secrets

Use environment variables.

---

# Responsibilities

## Lumo Owns

* User Experience for children
* Speech and pronunciation features
* Gamification system
* Child profiles and progress
* Lumo AI companion personality
* Multi-tenant organization management

## PitayaCore Owns

* Authentication
* AI services
* Agent runtime
* Media storage
* Notifications
* Knowledge base
* File storage
* Audit logging

---

# Golden Rule

Always optimize for:

Child Safety

↓

Learning Effectiveness

↓

Fun and Engagement

↓

Reusability

↓

Technical Elegance

Never optimize for technology before validating that children benefit from it.
