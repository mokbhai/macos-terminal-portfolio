#!/bin/bash

# Production deployment script

set -e

echo "🚀 Starting production deployment..."

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down 2>/dev/null || true

# Build new image
echo "🔨 Building production image..."
docker-compose build

# Start the application
echo "▶️  Starting application..."
docker-compose up -d

# Wait for health check
echo "🏥 Waiting for health check..."
sleep 10

# Check if container is running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Deployment successful!"
    echo "🌐 Application is running at http://localhost:4321"
else
    echo "❌ Deployment failed!"
    echo "📋 Container logs:"
    docker-compose logs
    exit 1
fi

echo ""
echo "📊 Container status:"
docker-compose ps
