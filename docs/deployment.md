# Lumo Deployment Guide

## Overview

This guide covers the deployment of Lumo in both development and production environments.

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- MySQL 8 (provided by pitayacore-mysql)
- Access to PitayaCode Docker network (`pitayacode_net`)

## Development Setup

### 1. Clone Repository

```bash
cd C:\pitayacode
git clone https://github.com/chessco/lumo.git
cd lumo
```

### 2. Configure Environment Variables

#### API (.env)

```bash
cd api
cp .env.example .env
```

Edit `api/.env`:
```env
# Transactional DB (MySQL)
DATABASE_URL="mysql://root:acuacore_pass@localhost:3306/lumo"

# AI
GEMINI_API_KEY="your-gemini-api-key"
JWT_SECRET="your-jwt-secret"

# PitayaCore Integration
PITAYACORE_URL="https://pitayacore-api.pitayacode.io"
INTERNAL_API_KEY="pitaya_internal_secret_2026"

# Application
PORT=3017
FRONTEND_URL="http://localhost:3000"
NODE_ENV=development
```

#### Frontend (.env)

```bash
cd ../web
cp .env.example .env
```

Edit `web/.env`:
```env
VITE_API_URL=http://localhost:3017
```

### 3. Install Dependencies

#### API
```bash
cd ../api
npm install
```

#### Frontend
```bash
cd ../web
npm install
```

### 4. Setup Database

```bash
cd ../api

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database
npm run prisma:seed
```

### 5. Start Development Servers

#### API (Terminal 1)
```bash
cd api
npm run start:dev
```

API will be available at `http://localhost:3017`

#### Frontend (Terminal 2)
```bash
cd web
npm run dev
```

Frontend will be available at `http://localhost:3000`

### 6. Access Application

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3017
- **Swagger Docs**: http://localhost:3017/api/docs

## Production Deployment

### 1. Build Docker Images

```bash
cd C:\pitayacode\lumo

# Build API
docker build -t lumo-api ./api

# Build Frontend
docker build -t lumo-web ./web
```

### 2. Configure Production Environment

#### API Production (.env.prod)

Edit `api/.env.prod`:
```env
# Transactional DB (MySQL)
DATABASE_URL="mysql://root:luxury_pass@pitaya-mysql-prod:3306/lumo"

# AI
GEMINI_API_KEY="your-production-gemini-api-key"
JWT_SECRET="your-production-jwt-secret"

# PitayaCore Integration
PITAYACORE_URL="https://pitayacore-api.pitayacode.io"
INTERNAL_API_KEY="pitaya_internal_secret_2026"

# Application
PORT=3017
FRONTEND_URL="https://lumo.pitayacode.io"
API_URL="https://lumo-api.pitayacode.io"
NODE_ENV=production

# Database variables for docker-compose
MYSQL_ROOT_PASSWORD="luxury_pass"
MYSQL_DATABASE="lumo"
```

### 3. Start Production Services

```bash
docker compose up -d
```

### 4. Verify Deployment

```bash
# Check container status
docker compose ps

# Check logs
docker compose logs -f lumo-api
docker compose logs -f lumo-web

# Test API health
curl http://localhost:3017/api/docs
```

### 5. Configure Nginx Proxy Manager

In Nginx Proxy Manager, create:

#### API Proxy Host
- **Domain**: `lumo-api.pitayacode.io`
- **Forward Hostname**: `lumo-api`
- **Forward Port**: `3017`
- **SSL**: Enable (Let's Encrypt)

#### Frontend Proxy Host
- **Domain**: `lumo.pitayacode.io`
- **Forward Hostname**: `lumo-web`
- **Forward Port**: `80`
- **SSL**: Enable (Let's Encrypt)

## Docker Commands

### Start Services
```bash
docker compose up -d
```

### Stop Services
```bash
docker compose down
```

### View Logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f lumo-api
```

### Rebuild Services
```bash
# Rebuild and start
docker compose up -d --build

# Force rebuild
docker compose build --no-cache
docker compose up -d
```

### Execute Commands in Container
```bash
# Access API container
docker exec -it lumo-api sh

# Run Prisma commands
docker exec -it lumo-api npx prisma generate
docker exec -it lumo-api npx prisma db push
docker exec -it lumo-api npm run prisma:seed
```

## Database Management

### Backup Database
```bash
docker exec pitayacore-mysql mysqldump -uroot -pluxury_pass lumo > lumo_backup.sql
```

### Restore Database
```bash
docker exec -i pitayacore-mysql mysql -uroot -pluxury_pass lumo < lumo_backup.sql
```

### Access MySQL Console
```bash
docker exec -it pitayacore-mysql mysql -uroot -pluxury_pass lumo
```

## Environment Variables Reference

### API Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | MySQL connection string | - | Yes |
| `GEMINI_API_KEY` | Google Gemini API key | - | Yes |
| `JWT_SECRET` | JWT signing secret | - | Yes |
| `PITAYACORE_URL` | PitayaCore API URL | https://pitayacore-api.pitayacode.io | Yes |
| `INTERNAL_API_KEY` | Internal API key | - | Yes |
| `PORT` | API port | 3017 | No |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 | No |
| `NODE_ENV` | Environment | development | No |
| `MYSQL_ROOT_PASSWORD` | MySQL root password | - | Yes |
| `MYSQL_DATABASE` | MySQL database name | lumo | Yes |

### Frontend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | API URL | http://localhost:3017 | Yes |

## Troubleshooting

### Database Connection Issues

1. Verify MySQL container is running:
   ```bash
   docker ps | grep pitayacore-mysql
   ```

2. Check database exists:
   ```bash
   docker exec pitayacore-mysql mysql -uroot -pluxury_pass -e "SHOW DATABASES LIKE 'lumo';"
   ```

3. Test connection:
   ```bash
   docker exec pitayacore-mysql mysql -uroot -pluxury_pass -e "USE lumo; SHOW TABLES;"
   ```

### API Not Starting

1. Check logs:
   ```bash
   docker compose logs lumo-api
   ```

2. Verify environment variables:
   ```bash
   docker exec lumo-api env | grep DATABASE_URL
   ```

3. Check port availability:
   ```bash
   netstat -ano | findstr :3017
   ```

### Frontend Not Loading

1. Check logs:
   ```bash
   docker compose logs lumo-web
   ```

2. Verify nginx configuration:
   ```bash
   docker exec lumo-web nginx -t
   ```

3. Check port availability:
   ```bash
   netstat -ano | findstr :3000
   ```

### Prisma Issues

1. Regenerate client:
   ```bash
   docker exec -it lumo-api npx prisma generate
   ```

2. Push schema:
   ```bash
   docker exec -it lumo-api npx prisma db push
   ```

3. Reset database:
   ```bash
   docker exec -it lumo-api npx prisma migrate reset
   ```

## Monitoring

### Health Checks

- **API**: `http://localhost:3017/api/docs`
- **Frontend**: `http://localhost:3000`
- **Database**: `docker exec pitayacore-mysql mysqladmin ping`

### Logs

```bash
# Real-time logs
docker compose logs -f

# Last 100 lines
docker compose logs --tail 100

# Logs since specific time
docker compose logs --since 2024-01-01T00:00:00
```

## Rollback

### Rollback to Previous Version

```bash
# Stop current services
docker compose down

# Checkout previous version
git checkout <previous-commit>

# Rebuild and start
docker compose up -d --build
```

### Database Rollback

```bash
# Restore from backup
docker exec -i pitayacore-mysql mysql -uroot -pluxury_pass lumo < lumo_backup.sql
```

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **Secrets**: Use strong, unique secrets for JWT and API keys
3. **Database**: Use separate credentials for production
4. **Network**: Ensure `pitayacode_net` is properly secured
5. **SSL**: Always use SSL in production
6. **Updates**: Regularly update dependencies for security patches

## Performance Optimization

1. **Database**: Add indexes for frequently queried fields
2. **Caching**: Implement Redis caching for frequently accessed data
3. **CDN**: Use CDN for static assets
4. **Compression**: Enable gzip compression in nginx
5. **Monitoring**: Set up monitoring and alerting

## Backup Strategy

1. **Database**: Daily automated backups
2. **Files**: Regular backup of uploaded files
3. **Configuration**: Version control for all configuration
4. **Testing**: Regular backup restoration tests
