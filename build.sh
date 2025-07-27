#!/bin/bash

# Build and deploy script for the portfolio

set -e

echo "🐳 Building Docker image..."

# Build the production image
docker build -t mokshit-portfolio:latest .

echo "✅ Build completed successfully!"

# Optional: Tag for different environments
if [ "$1" = "prod" ]; then
    echo "🏷️  Tagging for production..."
    docker tag mokshit-portfolio:latest mokshit-portfolio:prod
fi

if [ "$1" = "staging" ]; then
    echo "🏷️  Tagging for staging..."
    docker tag mokshit-portfolio:latest mokshit-portfolio:staging
fi

echo "🚀 Ready to deploy!"
echo ""
echo "To run locally:"
echo "  docker run -p 4321:4321 mokshit-portfolio:latest"
echo ""
echo "To run with docker-compose:"
echo "  docker-compose up"
echo ""
echo "To run in development mode:"
echo "  docker-compose --profile dev up portfolio-dev"
