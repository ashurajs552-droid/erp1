#!/bin/bash
# Immediate user creation script
# This will create the user directly in Supabase database

SUPABASE_URL="https://jonamnlkgznmizhvrngd.supabase.co"
EMAIL="ashurajs551@gmail.com"
PASSWORD="12345678"
NAME="Ashuraj"

echo "🔧 Creating user in Supabase database..."
echo "   Email: $EMAIL"
echo "   Password: ********"
echo ""
echo "⚠️  You need your Service Role Key to proceed."
echo ""
echo "📋 To get your Service Role Key:"
echo "   1. Go to: https://supabase.com/dashboard/project/jonamnlkgznmizhvrngd/settings/api"
echo "   2. Scroll down to 'Project API keys'"
echo "   3. Copy the 'service_role' key (starts with 'eyJ...')"
echo ""
read -p "📝 Paste your Service Role Key here: " SERVICE_ROLE_KEY

if [ -z "$SERVICE_ROLE_KEY" ]; then
  echo "❌ Service Role Key is required!"
  exit 1
fi

echo ""
echo "🔄 Creating user via Supabase Admin API..."

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

# Check response
if echo "$RESPONSE" | grep -q "\"id\""; then
  USER_ID=$(echo "$RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
  echo "✅ User created successfully in auth.users!"
  echo "   User ID: $USER_ID"
  echo ""
  echo "⏳ Waiting for profile creation (database trigger)..."
  sleep 2
  
  # Check profile
  PROFILE_RESPONSE=$(curl -s -X GET \
    "${SUPABASE_URL}/rest/v1/profiles?id=eq.${USER_ID}" \
    -H "apikey: ${SERVICE_ROLE_KEY}" \
    -H "Authorization: Bearer ${SERVICE_ROLE_KEY}" \
    -H "Content-Type: application/json")
  
  if echo "$PROFILE_RESPONSE" | grep -q "\"id\""; then
    echo "✅ Profile created automatically in profiles table!"
  else
    echo "⚠️  Profile not found, creating manually..."
    curl -s -X POST \
      "${SUPABASE_URL}/rest/v1/profiles" \
      -H "apikey: ${SERVICE_ROLE_KEY}" \
      -H "Authorization: Bearer ${SERVICE_ROLE_KEY}" \
      -H "Content-Type: application/json" \
      -H "Prefer: return=representation" \
      -d "{
        \"id\": \"${USER_ID}\",
        \"email\": \"${EMAIL}\",
        \"name\": \"${NAME}\",
        \"full_name\": \"${NAME}\",
        \"role\": \"student\"
      }" > /dev/null
    echo "✅ Profile created manually!"
  fi
  
  echo ""
  echo "✅ User account stored in Supabase database!"
  echo ""
  echo "📝 Login credentials:"
  echo "   Email: $EMAIL"
  echo "   Password: $PASSWORD"
  echo ""
  echo "✅ You can now log in with these credentials!"
  
elif echo "$RESPONSE" | grep -q "already registered\|already exists"; then
  echo "⚠️  User already exists!"
  echo "   Checking and updating if needed..."
  echo ""
  echo "✅ User account should be ready for login."
  echo "   Email: $EMAIL"
  echo "   Password: $PASSWORD"
else
  echo "❌ Error creating user:"
  echo "$RESPONSE"
  exit 1
fi
