# Docker Deployment Guide

This portfolio application supports multi-stage Docker builds for efficient production deployment.

## 🚀 Quick Start

### Production Deployment

```bash
# Build and run with docker-compose
docker-compose up -d

# Or build and run manually
docker build -t mokshit-portfolio .
docker run -p 4321:4321 mokshit-portfolio
```

### Development with Hot Reloading

```bash
# Run development environment
docker-compose --profile dev up portfolio-dev
```

## 📁 Files Overview

- `Dockerfile` - Multi-stage production build
- `Dockerfile.dev` - Development environment with hot reloading
- `docker-compose.yml` - Orchestration for both prod and dev
- `.dockerignore` - Optimizes build context
- `build.sh` - Build script with tagging options
- `deploy.sh` - Production deployment automation

## 🔧 Build Options

### Using Build Scripts

```bash
# Build for production
./build.sh prod

# Build for staging
./build.sh staging

# Deploy to production
./deploy.sh
```

### Manual Docker Commands

```bash
# Build production image
docker build -t mokshit-portfolio:latest .

# Build with specific target
docker build --target production -t mokshit-portfolio:prod .

# Run with custom port
docker run -p 8080:4321 mokshit-portfolio:latest
```

## 🌐 Environment Variables

The application supports the following environment variables:

- `NODE_ENV` - Set to 'production' for production builds
- `PORT` - Port to run the application (default: 4321)

## 📊 Health Checks

The Docker setup includes health checks to monitor application status:

- HTTP health check on port 4321
- 30-second intervals
- 3 retry attempts

## 🔒 Security Features

- Non-root user execution
- Minimal Alpine Linux base image
- Production-only dependencies in final image
- Proper file permissions

## 🚦 Commands

| Command                           | Description                   |
| --------------------------------- | ----------------------------- |
| `docker-compose up`               | Start production environment  |
| `docker-compose --profile dev up` | Start development environment |
| `docker-compose logs`             | View application logs         |
| `docker-compose down`             | Stop and remove containers    |
| `./build.sh`                      | Build production image        |
| `./deploy.sh`                     | Deploy to production          |

## 📋 Troubleshooting

### Check container status

```bash
docker-compose ps
```

### View logs

```bash
docker-compose logs portfolio
```

### Rebuild without cache

```bash
docker-compose build --no-cache
```

### Enter container for debugging

```bash
docker-compose exec portfolio sh
```
