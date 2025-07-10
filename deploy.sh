#!/bin/bash

# Deployment script for React app
echo "🚀 Starting deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build files are in the 'dist' directory"
    echo ""
    echo "📋 Next steps:"
    echo "1. Upload the 'dist' folder to your server"
    echo "2. Configure your web server (nginx/apache) to serve the files"
    echo "3. Set up your domain to point to the server"
else
    echo "❌ Build failed!"
    exit 1
fi 