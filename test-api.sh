#!/bin/bash

echo "🧪 Testing ARIS Backend API..."

# Test 1: Health Check
echo "1. Testing Health Check..."
curl -s http://localhost:5001/health
echo -e "\n"

# Test 2: Contact Form
echo "2. Testing Contact Form..."
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Testing email service integration",
    "source": "home"
  }'
echo -e "\n"

# Test 3: Newsletter
echo "3. Testing Newsletter..."
curl -X POST http://localhost:5001/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "source": "test"
  }'
echo -e "\n"

echo "✅ API tests completed!"
