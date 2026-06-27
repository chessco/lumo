# Lumo API Documentation

## Overview

The Lumo API is a NestJS-based RESTful API that provides all backend services for the Lumo educational platform.

**Base URL**: `http://localhost:3017` (development) / `https://lumo-api.pitayacode.io` (production)

**Swagger Documentation**: `http://localhost:3017/api/docs`

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Get Token

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

**Response**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

## Endpoints

### Auth

#### Login
```http
POST /auth/login
```

**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```

**Response**: `200 OK`
```json
{
  "access_token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string"
  }
}
```

#### Register
```http
POST /auth/register
```

**Request Body**:
```json
{
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string"
}
```

**Response**: `201 Created`

#### Get Profile
```http
GET /auth/me
Authorization: Bearer <token>
```

**Response**: `200 OK`

### Organizations

#### Create Organization
```http
POST /organizations
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "name": "string",
  "slug": "string",
  "email": "string",
  "phone": "string",
  "address": "string"
}
```

**Response**: `201 Created`

#### Get All Organizations
```http
GET /organizations
Authorization: Bearer <token>
```

**Response**: `200 OK`

#### Get Organization by ID
```http
GET /organizations/:id
Authorization: Bearer <token>
```

**Response**: `200 OK`

#### Update Organization
```http
PUT /organizations/:id
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "logo": "string"
}
```

**Response**: `200 OK`

#### Deactivate Organization
```http
DELETE /organizations/:id
Authorization: Bearer <token>
```

**Response**: `200 OK`

### Users

#### Create User
```http
POST /users
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "phone": "string"
}
```

**Response**: `201 Created`

#### Get All Users
```http
GET /users
Authorization: Bearer <token>
```

**Response**: `200 OK`

#### Get User by ID
```http
GET /users/:id
Authorization: Bearer <token>
```

**Response**: `200 OK`

#### Update User
```http
PUT /users/:id
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "firstName": "string",
  "lastName": "string",
  "phone": "string",
  "avatar": "string"
}
```

**Response**: `200 OK`

#### Change Password
```http
PUT /users/:id/password
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "newPassword": "string"
}
```

**Response**: `200 OK`

#### Deactivate User
```http
DELETE /users/:id
Authorization: Bearer <token>
```

**Response**: `200 OK`

### Children

#### Create Child
```http
POST /children
Authorization: Bearer <token>
x-tenant-id: <tenant-id>
```

**Request Body**:
```json
{
  "firstName": "string",
  "lastName": "string",
  "dateOfBirth": "2020-01-01",
  "parentId": "uuid",
  "preferences": {}
}
```

**Response**: `201 Created`

#### Get All Children
```http
GET /children
Authorization: Bearer <token>
x-tenant-id: <tenant-id>
```

**Response**: `200 OK`

#### Get Child by ID
```http
GET /children/:id
Authorization: Bearer <token>
x-tenant-id: <tenant-id>
```

**Response**: `200 OK`

#### Get Children by Parent
```http
GET /children/parent/:parentId
Authorization: Bearer <token>
x-tenant-id: <tenant-id>
```

**Response**: `200 OK`

#### Update Child
```http
PUT /children/:id
Authorization: Bearer <token>
x-tenant-id: <tenant-id>
```

**Request Body**:
```json
{
  "firstName": "string",
  "lastName": "string",
  "dateOfBirth": "2020-01-01",
  "avatar": "string",
  "preferences": {}
}
```

**Response**: `200 OK`

#### Deactivate Child
```http
DELETE /children/:id
Authorization: Bearer <token>
x-tenant-id: <tenant-id>
```

**Response**: `200 OK`

### Speech

#### Start Session
```http
POST /speech/sessions
Authorization: Bearer <token>
x-tenant-id: <tenant-id>
```

**Request Body**:
```json
{
  "childId": "uuid",
  "exerciseId": "uuid"
}
```

**Response**: `201 Created`

#### End Session
```http
PUT /speech/sessions/:id/end
Authorization: Bearer <token>
```

**Response**: `200 OK`

#### Get Session
```http
GET /speech/sessions/:id
Authorization: Bearer <token>
```

**Response**: `200 OK`

#### Get Sessions by Child
```http
GET /speech/sessions/child/:childId?limit=20
Authorization: Bearer <token>
```

**Response**: `200 OK`

#### Record Phoneme Attempt
```http
POST /speech/sessions/:id/phoneme-attempt
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "phonemeId": "uuid",
  "audioUrl": "string"
}
```

**Response**: `201 Created`

#### Upload Audio
```http
POST /speech/sessions/:id/audio
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <audio-file>
```

**Response**: `201 Created`

#### Get Exercises
```http
GET /speech/exercises?difficulty=beginner&category=vowels
Authorization: Bearer <token>
```

**Response**: `200 OK`

#### Get Exercise by ID
```http
GET /speech/exercises/:id
Authorization: Bearer <token>
```

**Response**: `200 OK`

#### Create Exercise
```http
POST /speech/exercises
Authorization: Bearer <token>
x-tenant-id: <tenant-id>
```

**Request Body**:
```json
{
  "name": "string",
  "description": "string",
  "difficulty": "beginner",
  "category": "vowels",
  "targetPhonemes": ["a", "e", "i", "o", "u"],
  "content": {}
}
```

**Response**: `201 Created`

#### Get Phonemes
```http
GET /speech/phonemes?language=es
Authorization: Bearer <token>
```

**Response**: `200 OK`

#### Get Progress
```http
GET /speech/progress/:childId
Authorization: Bearer <token>
```

**Response**: `200 OK`

#### Get Leaderboard
```http
GET /speech/leaderboard?limit=10
Authorization: Bearer <token>
```

**Response**: `200 OK`

#### Get Rewards
```http
GET /speech/rewards/:childId
Authorization: Bearer <token>
```

**Response**: `200 OK`

#### Check Badges
```http
POST /speech/rewards/:childId/check
Authorization: Bearer <token>
```

**Response**: `200 OK`

### Lumi

#### Greet
```http
POST /lumi/greet
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "childName": "string"
}
```

**Response**: `200 OK`
```json
{
  "message": "¡Hola Sofía! 🌟 Soy Lumi, tu amiga de aprendizaje...",
  "emotion": "happy"
}
```

#### Explain Exercise
```http
POST /lumi/explain-exercise
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "exerciseName": "string",
  "exerciseDescription": "string"
}
```

**Response**: `200 OK`

#### Celebrate
```http
POST /lumi/celebrate
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "childName": "string",
  "achievement": "string"
}
```

**Response**: `200 OK`

#### Encourage
```http
POST /lumi/encourage
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "childName": "string",
  "phoneme": "string"
}
```

**Response**: `200 OK`

#### Feedback
```http
POST /lumi/feedback
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "childName": "string",
  "score": 85
}
```

**Response**: `200 OK`

#### Chat
```http
POST /lumi/chat/:childId
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "message": "string"
}
```

**Response**: `200 OK`

#### Get Personality
```http
GET /lumi/personality
Authorization: Bearer <token>
```

**Response**: `200 OK`
```json
{
  "name": "Lumi",
  "traits": ["friendly", "encouraging", "patient", "playful", "educational", "emotionally safe"],
  "capabilities": ["greet children", "explain exercises", "celebrate progress", "encourage repetition", "provide positive feedback"],
  "avatar": "🌟"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Forbidden resource"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "statusCode": 429,
  "message": "ThrottlerException: Too Many Requests"
}
```

## Rate Limiting

- **Limit**: 100 requests per 60 seconds
- **Scope**: Per IP address
- **Headers**: 
  - `X-RateLimit-Limit`: Maximum requests
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset time

## Pagination

For list endpoints, use query parameters:

```http
GET /endpoint?page=1&limit=20
```

**Response**:
```json
{
  "data": [],
  "total": 100,
  "page": 1,
  "limit": 20,
  "totalPages": 5
}
```

## Filtering

Use query parameters for filtering:

```http
GET /endpoint?status=active&type=premium
```

## Sorting

Use query parameters for sorting:

```http
GET /endpoint?sortBy=createdAt&sortOrder=desc
```

## Headers

### Required Headers

- `Content-Type: application/json` (for POST/PUT requests)
- `Authorization: Bearer <token>` (for protected endpoints)
- `x-tenant-id: <tenant-id>` (for tenant-specific endpoints)

### Optional Headers

- `Accept: application/json`
- `Accept-Language: es`
