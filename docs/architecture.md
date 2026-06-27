# Lumo Architecture

## Overview

Lumo is an AI-powered educational platform for children, built as part of the PitayaCode ecosystem. It follows a multi-tenant architecture and integrates with PitayaCore through REST APIs.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Lumo Platform                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Frontend   │    │    Backend   │    │   Database   │  │
│  │   (React)    │◄──►│   (NestJS)   │◄──►│   (MySQL)    │  │
│  │   Port 3000  │    │   Port 3017  │    │   Port 3306  │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     PitayaCore Platform                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ Auth API │ │  AI API  │ │ Agent API│ │ Media API│       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Components

### Frontend (React + Vite)

- **Technology**: React 18, TypeScript, Vite, TailwindCSS, ShadCN
- **Port**: 3000
- **Features**:
  - Progressive Web App (PWA)
  - Responsive design
  - Real-time UI updates
  - Audio recording and playback
  - Gamification elements

### Backend (NestJS)

- **Technology**: NestJS, TypeScript, Prisma, MySQL
- **Port**: 3017
- **Features**:
  - RESTful API
  - JWT authentication
  - Multi-tenancy support
  - Integration with PitayaCore
  - Swagger documentation

### Database (MySQL 8)

- **Container**: pitayacore-mysql
- **Port**: 3306
- **Database**: lumo
- **Features**:
  - Multi-tenant data isolation
  - UTF-8 support (utf8mb4)
  - Foreign key constraints

## Multi-Tenancy Architecture

Lumo uses Option 3 multi-tenant architecture with `tenant_id` throughout the system.

### Database Schema

All tables include `tenant_id` as a foreign key to the `organizations` table:

```sql
-- Core tables
organizations
users
memberships
children
roles
permissions
tenant_settings

-- Lumo Speak tables
speech_sessions
speech_exercises
phonemes
phoneme_attempts
audio_recordings
speech_progress
speech_rewards
```

### Tenant Isolation

- Each request includes `x-tenant-id` header
- `TenantMiddleware` extracts and stores tenant ID
- All queries filter by `tenant_id`
- `TenantOwnershipGuard` validates tenant access

## Integration Architecture

Lumo integrates with PitayaCore through REST APIs:

### API Clients

- **AuthClient** - User authentication and authorization
- **AiClient** - AI services (speech analysis, text generation)
- **AgentClient** - Conversational AI agents
- **MemoryClient** - User memory storage
- **MediaClient** - Audio and media file management
- **NotificationClient** - Push notifications
- **KnowledgeClient** - Knowledge base queries
- **FileClient** - File storage and retrieval
- **AuditClient** - Audit logging

### Integration Flow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Lumo API   │    │  PitayaCore  │    │   Services   │
│              │───►│    Gateway   │───►│              │
│  (Client)    │    │              │    │  (Auth, AI,  │
│              │◄───│              │◄───│   Media...)  │
└──────────────┘    └──────────────┘    └──────────────┘
```

## Module Architecture

### Auth Module

- JWT-based authentication
- Passport integration
- Guards for route protection
- Public route support

### Organizations Module

- Multi-tenant organization management
- CRUD operations
- Tenant isolation

### Users Module

- User profile management
- Password hashing with bcrypt
- Membership tracking

### Children Module

- Child profile management
- Parent-child relationships
- Progress tracking

### Speech Module

- Speech session management
- Exercise and phoneme management
- Audio recording and playback
- Pronunciation scoring
- Progress tracking
- Reward system

### Lumi Module

- AI companion personality
- Context-aware responses
- Emotional intelligence
- Educational guidance

## Docker Architecture

```yaml
services:
  lumo-api:
    build: ./api
    container_name: lumo-api
    ports:
      - "3017:3017"
    networks:
      - pitayacode_net

  lumo-web:
    build: ./web
    container_name: lumo-web
    ports:
      - "3000:80"
    networks:
      - pitayacode_net

networks:
  pitayacode_net:
    external: true
```

## Security Architecture

### Authentication Flow

1. User submits credentials
2. Backend validates against database
3. JWT token generated and returned
4. Token included in subsequent requests
5. Guards validate token on protected routes

### API Security

- JWT token validation
- API key for internal services
- Rate limiting (100 req/60s)
- Input validation with class-validator
- CORS configuration

### Data Security

- Password hashing with bcrypt
- Tenant data isolation
- SQL injection prevention (Prisma)
- XSS protection

## Deployment Architecture

### Development

- Local MySQL on port 3306
- API on port 3017
- Frontend on port 3000
- Hot reload enabled

### Production

- Docker containers
- External Docker network (pitayacode_net)
- Nginx reverse proxy
- SSL/TLS termination
- Environment-based configuration

## Performance Considerations

- Database indexing on frequently queried fields
- Connection pooling with Prisma
- Caching strategies (future)
- Lazy loading of components
- Code splitting with Vite

## Scalability

- Stateless API design
- Database connection management
- Horizontal scaling support
- Microservice-ready architecture

## Monitoring and Logging

- NestJS built-in logging
- Error tracking
- Performance monitoring
- Audit logging via PitayaCore

## Future Enhancements

- WebSocket support for real-time features
- Redis caching layer
- Message queue for async processing
- Advanced analytics
- Mobile applications
