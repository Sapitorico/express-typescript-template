#!/usr/bin/env bash
# scripts/run-integration.sh

DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/setenv.sh
docker-compose up -d
echo '🟡 - Waiting for database to be ready...'
$DIR/wait-until "docker-compose exec -T -e PGPASSWORD=${POSTGRES_PASSWORD} postgres psql -U ${POSTGRES_USER} ${POSTGRES_DB} -c 'select 1'" -- echo '🟢 - Database is ready!'
npx prisma migrate dev --name init
jest