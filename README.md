# 🌟 Lumo - Plataforma Educativa con IA para Niños

Lumo es una plataforma educativa impulsada por inteligencia artificial diseñada para mejorar el habla y la pronunciación de los niños de manera divertida y efectiva.

## 🚀 Características Principales

### Lumo Speak
- **Grabación de voz**: Los niños pueden grabar su pronunciación
- **Reproducción de audio**: Escucha sus propias grabaciones
- **Puntuación de pronunciación**: Evaluación en tiempo real con IA
- **Seguimiento de progreso**: Historial detallado de mejora
- **Gamificación**: Sistema de recompensas y niveles

### Lumi - Compañero IA
- **Personalidad amigable**: Alentador, paciente y divertido
- **Explicaciones adaptadas**: Adapta el contenido a la edad del niño
- **Celebración de logros**: Reconoce y celebra el progreso
- **Retroalimentación positiva**: Siempre motiva a seguir intentando

### Multi-tenancy
- **Organizaciones**: Gestiona múltiples escuelas o centros
- **Roles y permisos**: Control de acceso granular
- **Configuración por tenant**: Personalización por organización

## 🛠️ Stack Tecnológico

### Backend
- **NestJS** - Framework de Node.js
- **Prisma** - ORM para MySQL
- **MySQL 8** - Base de datos relacional
- **JWT** - Autenticación
- **Swagger** - Documentación de API
- **Class Validator** - Validación de datos
- **Passport** - Autenticación
- **Axios** - Cliente HTTP

### Frontend
- **React 18** - Biblioteca de UI
- **Vite** - Build tool
- **TypeScript** - Tipado estático
- **TailwindCSS** - Framework CSS
- **ShadCN** - Componentes UI
- **Tanstack Query** - Gestión de estado
- **React Router** - Enrutamiento
- **PWA** - Progressive Web App

### Infraestructura
- **Docker** - Contenedores
- **Nginx** - Servidor web
- **PitayaCore** - Integración con plataforma central

## 📁 Estructura del Proyecto

```
lumo/
├── api/                    # Backend NestJS
│   ├── src/                # Código fuente
│   │   ├── common/         # Módulos comunes
│   │   ├── integrations/   # Integraciones externas
│   │   └── modules/        # Módulos de negocio
│   ├── prisma/             # Schema de base de datos
│   └── package.json
├── web/                    # Frontend React
│   ├── src/                # Código fuente
│   │   ├── components/     # Componentes UI
│   │   ├── pages/          # Páginas
│   │   ├── hooks/          # Hooks personalizados
│   │   └── utils/          # Utilidades
│   └── package.json
├── docker-compose.yml      # Configuración Docker
├── .env                    # Variables de entorno
└── README.md               # Este archivo
```

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+
- Docker y Docker Compose
- MySQL 8 (ya configurado en pitayacore-mysql)

### Desarrollo Local

1. **Clonar el repositorio**
   ```bash
   cd C:\pitayacode
   git clone https://github.com/chessco/lumo.git
   ```

2. **Configurar variables de entorno**
   ```bash
   cd lumo
   cp api/.env.example api/.env
   cp web/.env.example web/.env
   ```

3. **Instalar dependencias del API**
   ```bash
   cd api
   npm install
   ```

4. **Generar cliente Prisma**
   ```bash
   npx prisma generate
   ```

5. **Iniciar el API**
   ```bash
   npm run start:dev
   ```

6. **Instalar dependencias del Frontend**
   ```bash
   cd ../web
   npm install
   ```

7. **Iniciar el Frontend**
   ```bash
   npm run dev
   ```

### Producción con Docker

1. **Construir imágenes**
   ```bash
   docker compose build
   ```

2. **Iniciar servicios**
   ```bash
   docker compose up -d
   ```

3. **Verificar estado**
   ```bash
   docker compose ps
   ```

## 🔌 Integración con PitayaCore

Lumo se integra con PitayaCore a través de APIs REST:

- **Auth API** - Autenticación y autorización
- **AI API** - Servicios de inteligencia artificial
- **Agent API** - Agentes conversacionales
- **Memory API** - Almacenamiento de memoria
- **Media API** - Gestión de archivos multimedia
- **Notifications API** - Sistema de notificaciones
- **Knowledge API** - Base de conocimiento
- **Files API** - Gestión de archivos
- **Audit API** - Auditoría y logs

### Configuración

```env
PITAYACORE_URL=https://pitayacore-api.pitayacode.io
INTERNAL_API_KEY=pitaya_internal_secret_2026
```

## 📊 Base de Datos

### Multi-tenancy
Todas las tablas incluyen `tenant_id` para aislamiento de datos:

- `organizations` - Organizaciones
- `users` - Usuarios
- `memberships` - Membresías
- `children` - Niños
- `roles` - Roles
- `permissions` - Permisos
- `tenant_settings` - Configuración por tenant

### Lumo Speak
Tablas específicas del módulo de habla:

- `speech_sessions` - Sesiones de práctica
- `speech_exercises` - Ejercicios
- `phonemes` - Fonemas
- `phoneme_attempts` - Intentos de pronunciación
- `audio_recordings` - Grabaciones de audio
- `speech_progress` - Progreso
- `speech_rewards` - Recompensas

## 🎯 Módulos

### 1. Auth Module
Autenticación y autorización con JWT.

### 2. Organizations Module
Gestión de organizaciones multi-tenant.

### 3. Users Module
Gestión de usuarios y perfiles.

### 4. Children Module
Gestión de perfiles de niños.

### 5. Speech Module
Módulo principal de Lumo Speak:
- Sesiones de práctica
- Ejercicios de pronunciación
- Fonemas y intentos
- Progreso y recompensas

### 6. Lumi Module
Compañero de IA con personalidad:
- Saludos personalizados
- Explicaciones de ejercicios
- Celebración de logros
- Aliento para repetir
- Retroalimentación positiva

## 🔐 Seguridad

- **JWT** para autenticación
- **API Keys** para integración interna
- **Guards** para protección de rutas
- **Validación** de datos con class-validator
- **Multi-tenancy** para aislamiento de datos

## 📚 Documentación

- [Architecture](docs/architecture.md) - Arquitectura del sistema
- [API](docs/api.md) - Documentación de la API
- [Deployment](docs/deployment.md) - Guía de despliegue
- [Database](docs/database.md) - Diseño de base de datos

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama para nueva feature (`git checkout -b feature/nueva-feature`)
3. Commit cambios (`git commit -m 'Add nueva feature'`)
4. Push a la rama (`git push origin feature/nueva-feature`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto es parte del ecosistema PitayaCode.

## 👥 Equipo

- **PitayaCode** - Desarrollo y mantenimiento

## 🙏 Agradecimientos

- PitayaCore por la infraestructura
- NestJS y React por los frameworks
- La comunidad de open source
