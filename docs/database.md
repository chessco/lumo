# Lumo Database Documentation

## Overview

Lumo uses MySQL 8 as its primary database, hosted on the existing `pitayacore-mysql` container. The database is named `lumo` and uses UTF-8 encoding (`utf8mb4_unicode_ci`).

## Connection Details

- **Host**: `pitaya-mysql-prod` (Docker) / `localhost` (local development)
- **Port**: `3306`
- **User**: `root`
- **Password**: `luxury_pass` (production) / `acuacore_pass` (local development)
- **Database**: `lumo`
- **Charset**: `utf8mb4`
- **Collation**: `utf8mb4_unicode_ci`

## Multi-Tenancy Architecture

Lumo uses Option 3 multi-tenant architecture with `tenant_id` throughout the system.

### Tenant Isolation

- All tables include `tenant_id` as a foreign key to `organizations`
- All queries filter by `tenant_id`
- `TenantMiddleware` extracts tenant ID from request headers
- `TenantOwnershipGuard` validates tenant access

## Database Schema

### Core Multi-Tenancy Tables

#### organizations

Stores organization/tenant information.

```sql
CREATE TABLE organizations (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  logo VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  settings JSON,
  isActive BOOLEAN DEFAULT TRUE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### users

Stores user information.

```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  avatar VARCHAR(255),
  phone VARCHAR(50),
  isActive BOOLEAN DEFAULT TRUE,
  lastLoginAt DATETIME,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### memberships

Links users to organizations with roles.

```sql
CREATE TABLE memberships (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL,
  organizationId VARCHAR(36) NOT NULL,
  roleId VARCHAR(36),
  isActive BOOLEAN DEFAULT TRUE,
  joinedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (organizationId) REFERENCES organizations(id) ON DELETE CASCADE,
  FOREIGN KEY (roleId) REFERENCES roles(id),
  UNIQUE KEY unique_membership (userId, organizationId)
);
```

#### roles

Stores role definitions per organization.

```sql
CREATE TABLE roles (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  organizationId VARCHAR(36) NOT NULL,
  permissions JSON,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (organizationId) REFERENCES organizations(id) ON DELETE CASCADE,
  UNIQUE KEY unique_role (name, organizationId)
);
```

#### permissions

Stores permission definitions.

```sql
CREATE TABLE permissions (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  resource VARCHAR(255) NOT NULL,
  action VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### tenant_settings

Stores organization-specific settings.

```sql
CREATE TABLE tenant_settings (
  id VARCHAR(36) PRIMARY KEY,
  organizationId VARCHAR(36) NOT NULL,
  `key` VARCHAR(255) NOT NULL,
  value JSON,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (organizationId) REFERENCES organizations(id) ON DELETE CASCADE,
  UNIQUE KEY unique_setting (organizationId, `key`)
);
```

### Children Tables

#### children

Stores child profiles.

```sql
CREATE TABLE children (
  id VARCHAR(36) PRIMARY KEY,
  organizationId VARCHAR(36) NOT NULL,
  parentId VARCHAR(36),
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255),
  dateOfBirth DATE,
  avatar VARCHAR(255),
  preferences JSON,
  isActive BOOLEAN DEFAULT TRUE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (organizationId) REFERENCES organizations(id) ON DELETE CASCADE,
  FOREIGN KEY (parentId) REFERENCES users(id)
);
```

### Lumo Speak Tables

#### speech_sessions

Stores speech practice sessions.

```sql
CREATE TABLE speech_sessions (
  id VARCHAR(36) PRIMARY KEY,
  childId VARCHAR(36) NOT NULL,
  organizationId VARCHAR(36) NOT NULL,
  exerciseId VARCHAR(36),
  startedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  endedAt DATETIME,
  duration INT COMMENT 'Duration in seconds',
  status ENUM('active', 'completed', 'abandoned') DEFAULT 'active',
  metadata JSON,
  FOREIGN KEY (childId) REFERENCES children(id) ON DELETE CASCADE,
  FOREIGN KEY (organizationId) REFERENCES organizations(id),
  FOREIGN KEY (exerciseId) REFERENCES speech_exercises(id)
);
```

#### speech_exercises

Stores speech exercises.

```sql
CREATE TABLE speech_exercises (
  id VARCHAR(36) PRIMARY KEY,
  organizationId VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
  category VARCHAR(100) COMMENT 'vowels, consonants, words, sentences',
  targetPhonemes JSON COMMENT 'Array of phoneme IDs',
  content JSON COMMENT 'Exercise content, prompts, etc.',
  isActive BOOLEAN DEFAULT TRUE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (organizationId) REFERENCES organizations(id)
);
```

#### phonemes

Stores phoneme definitions.

```sql
CREATE TABLE phonemes (
  id VARCHAR(36) PRIMARY KEY,
  symbol VARCHAR(50) UNIQUE NOT NULL COMMENT 'IPA symbol',
  name VARCHAR(255) NOT NULL,
  language VARCHAR(10) DEFAULT 'es' COMMENT 'ISO language code',
  examples JSON COMMENT 'Array of example words',
  audioUrl VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### phoneme_attempts

Stores individual phoneme pronunciation attempts.

```sql
CREATE TABLE phoneme_attempts (
  id VARCHAR(36) PRIMARY KEY,
  sessionId VARCHAR(36) NOT NULL,
  phonemeId VARCHAR(36) NOT NULL,
  score DECIMAL(5,2) NOT NULL COMMENT '0-100 pronunciation score',
  feedback TEXT,
  audioUrl VARCHAR(255),
  attemptedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sessionId) REFERENCES speech_sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (phonemeId) REFERENCES phonemes(id)
);
```

#### audio_recordings

Stores audio recordings from sessions.

```sql
CREATE TABLE audio_recordings (
  id VARCHAR(36) PRIMARY KEY,
  sessionId VARCHAR(36) NOT NULL,
  childId VARCHAR(36) NOT NULL,
  fileUrl VARCHAR(255) NOT NULL,
  duration DECIMAL(10,2) COMMENT 'Duration in seconds',
  mimeType VARCHAR(50) DEFAULT 'audio/webm',
  fileSize INT COMMENT 'File size in bytes',
  transcription TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sessionId) REFERENCES speech_sessions(id) ON DELETE CASCADE
);
```

#### speech_progress

Stores daily progress summaries.

```sql
CREATE TABLE speech_progress (
  id VARCHAR(36) PRIMARY KEY,
  childId VARCHAR(36) NOT NULL,
  organizationId VARCHAR(36) NOT NULL,
  date DATE NOT NULL,
  totalSessions INT DEFAULT 0,
  totalDuration INT DEFAULT 0 COMMENT 'Duration in seconds',
  averageScore DECIMAL(5,2),
  streakDays INT DEFAULT 0,
  level INT DEFAULT 1,
  experience INT DEFAULT 0,
  metadata JSON,
  FOREIGN KEY (childId) REFERENCES children(id) ON DELETE CASCADE,
  FOREIGN KEY (organizationId) REFERENCES organizations(id),
  UNIQUE KEY unique_daily_progress (childId, date)
);
```

#### speech_rewards

Stores rewards and badges earned by children.

```sql
CREATE TABLE speech_rewards (
  id VARCHAR(36) PRIMARY KEY,
  childId VARCHAR(36) NOT NULL,
  organizationId VARCHAR(36) NOT NULL,
  type VARCHAR(50) NOT NULL COMMENT 'badge, achievement, milestone',
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  earnedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  metadata JSON,
  FOREIGN KEY (childId) REFERENCES children(id) ON DELETE CASCADE,
  FOREIGN KEY (organizationId) REFERENCES organizations(id)
);
```

## Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│  organizations  │       │     users       │       │   memberships   │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │◄──┐   │ id (PK)         │◄──┐   │ id (PK)         │
│ name            │   │   │ email           │   │   │ userId (FK)     │
│ slug            │   │   │ password        │   │   │ organizationId  │
│ ...             │   │   │ ...             │   │   │ roleId (FK)     │
└─────────────────┘   │   └─────────────────┘   │   └─────────────────┘
                       │                         │
                       │   ┌─────────────────┐   │
                       │   │   children      │   │
                       │   ├─────────────────┤   │
                       │   │ id (PK)         │   │
                       │   │ organizationId  │───┘
                       │   │ parentId (FK)   │
                       │   │ firstName       │
                       │   │ ...             │
                       │   └─────────────────┘
                       │
                       │   ┌─────────────────┐
                       │   │ speech_sessions │
                       │   ├─────────────────┤
                       │   │ id (PK)         │
                       │   │ childId (FK)    │
                       │   │ organizationId  │
                       │   │ exerciseId (FK) │
                       │   │ ...             │
                       │   └─────────────────┘
                       │
                       │   ┌─────────────────┐
                       │   │speech_exercises │
                       │   ├─────────────────┤
                       └───│ id (PK)         │
                           │ organizationId  │
                           │ name            │
                           │ ...             │
                           └─────────────────┘
```

## Indexes

### Primary Keys
All tables use UUID (`VARCHAR(36)`) as primary keys.

### Foreign Keys
- `memberships.userId` → `users.id`
- `memberships.organizationId` → `organizations.id`
- `memberships.roleId` → `roles.id`
- `children.organizationId` → `organizations.id`
- `children.parentId` → `users.id`
- `speech_sessions.childId` → `children.id`
- `speech_sessions.organizationId` → `organizations.id`
- `speech_sessions.exerciseId` → `speech_exercises.id`
- `phoneme_attempts.sessionId` → `speech_sessions.id`
- `phoneme_attempts.phonemeId` → `phonemes.id`
- `audio_recordings.sessionId` → `speech_sessions.id`
- `speech_progress.childId` → `children.id`
- `speech_progress.organizationId` → `organizations.id`
- `speech_rewards.childId` → `children.id`
- `speech_rewards.organizationId` → `organizations.id`

### Unique Constraints
- `organizations.slug`
- `users.email`
- `memberships(userId, organizationId)`
- `roles(name, organizationId)`
- `permissions.name`
- `tenant_settings(organizationId, key)`
- `phonemes.symbol`
- `speech_progress(childId, date)`

### Recommended Indexes
```sql
-- Performance indexes
CREATE INDEX idx_children_organization ON children(organizationId);
CREATE INDEX idx_children_parent ON children(parentId);
CREATE INDEX idx_speech_sessions_child ON speech_sessions(childId);
CREATE INDEX idx_speech_sessions_organization ON speech_sessions(organizationId);
CREATE INDEX idx_phoneme_attempts_session ON phoneme_attempts(sessionId);
CREATE INDEX idx_speech_progress_child ON speech_progress(childId);
CREATE INDEX idx_speech_progress_date ON speech_progress(date);
CREATE INDEX idx_speech_rewards_child ON speech_rewards(childId);
```

## Prisma Schema

The database schema is defined using Prisma in `api/prisma/schema.prisma`.

### Generate Prisma Client

```bash
cd api
npx prisma generate
```

### Push Schema to Database

```bash
npx prisma db push
```

### Seed Database

```bash
npm run prisma:seed
```

## Backup and Restore

### Backup

```bash
docker exec pitayacore-mysql mysqldump -uroot -pluxury_pass lumo > lumo_backup.sql
```

### Restore

```bash
docker exec -i pitayacore-mysql mysql -uroot -pluxury_pass lumo < lumo_backup.sql
```

### Access MySQL Console

```bash
docker exec -it pitayacore-mysql mysql -uroot -pluxury_pass lumo
```

## Data Migration

### Adding New Columns

1. Add column to Prisma schema
2. Run `npx prisma db push`
3. Update application code

### Modifying Columns

1. Create migration file
2. Run migration
3. Update application code

## Performance Considerations

1. **Indexes**: Add indexes for frequently queried columns
2. **Query Optimization**: Use `select` to limit returned columns
3. **Pagination**: Implement pagination for large result sets
4. **Connection Pooling**: Prisma handles connection pooling automatically
5. **Caching**: Consider Redis for frequently accessed data

## Security

1. **Passwords**: Stored as bcrypt hashes
2. **SQL Injection**: Prevented by Prisma's query builder
3. **Access Control**: Enforced at application level with guards
4. **Tenant Isolation**: Enforced by `tenant_id` filtering
5. **Encryption**: Use SSL for database connections in production

## Monitoring

1. **Slow Queries**: Enable slow query log
2. **Connections**: Monitor connection pool usage
3. **Storage**: Monitor database size
4. **Backups**: Verify backup integrity regularly
