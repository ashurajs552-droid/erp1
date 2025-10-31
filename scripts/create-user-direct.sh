#!/bin/bash
# Direct script to create user in Supabase using Admin API
# Usage: ./scripts/create-user-direct.sh

# Get these from Supabase Dashboard → Project Settings → API
SUPABASE_URL="${NEXT_PUBLIC_SUPABASE_URL:-https://jonamnlkgznmizhvrngd.supabase.co}"
SERVICE_ROLE_KEY="${SUPABASE_SERVICE_ROLE_KEY}"

if [ -z "$SERVICE_ROLE_KEY" ]; then
  echo "❌ SUPABASE_SERVICE_ROLE_KEY not set"
  echo "   Get it from: Supabase Dashboard → Project Settings → API → service_role key"
  echo "   Add it to .env.local or export it:"
  echo "   export SUPABASE_SERVICE_ROLE_KEY=your_service_role_key"
  exit 1
fi

EMAIL="ashurajs551@gmail.com"
PASSWORD="12345678"
NAME="Ashuraj"

echo "🔧 Creating user account in Supabase..."
echo "   Email: $EMAIL"
echo "   Name: $NAME"
echo ""

# Create user using Admin API
RESPONSE=$(curl -s -X POST \
  "${SUPABASE_URL}/auth/v1/admin/users" \
  -H "apikey: ${SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"${EMAIL}\",
    \"password\": \"${PASSWORD}\",
    \"email_confirm\": true,
    \"user_metadata\": {
      \"name\": \"${NAME}\"
    }
  }")

# Check if successful
if echo "$RESPONSE" | grep -q "\"id\""; then
  echo "✅ User created successfully!"
  USER_ID=$(echo "$RESPONSE" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
  echo "   User ID: $USER_ID"
  echo ""
  echo "✅ Login credentials:"
  echo "   Email: $EMAIL"
  echo "   Password: $PASSWORD"
  echo ""
  echo "✅ You can now log in with these credentials!"
else
  # Check if user already exists
  if echo "$RESPONSE" | grep -q "already registered\|already exists"; then
    echo "⚠️  User already exists. Checking if email is confirmed..."
    
    # List users to find existing one
    USER_RESPONSE=$(curl -s -X GET \
      "${SUPABASE_URL}/auth/v1/admin/users?page=1&per_page=1000" \
      -H "apikey: ${SERVICE_ROLE_KEY}" \
      -H "Authorization: Bearer ${SERVICE_ROLE_KEY}")
    
    # Confirm email for existing user
    echo "$RESPONSE"
    echo ""
    echo "✅ User account exists. Please check Supabase dashboard."
  else
    echo "❌ Error creating user:"
    echo "$RESPONSE"
    exit 1
  fi
fi
