#!/usr/bin/env bash
# scripts/reset-migration.sh
# Regenera la migración inicial 0_init desde el schema actual

set -e

echo "🔄 Regenerando migración inicial 0_init..."

# 1. Eliminar directorio de migraciones
echo "🗑️  Eliminando migraciones antiguas..."
rm -rf prisma/migrations

# 2. Crear directorio para 0_init
echo "📁 Creando directorio 0_init..."
mkdir -p prisma/migrations/0_init

# 3. Generar SQL desde schema actual
echo "📝 Generando migration.sql desde schema.prisma..."
npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel prisma/schema.prisma \
  --script > prisma/migrations/0_init/migration.sql

echo "✅ Migración 0_init regenerada exitosamente!"
echo ""
echo "Para aplicar la migración a la base de datos, ejecuta:"
echo "  npm run prisma:reset  (resetea DB y aplica 0_init)"
echo "  npm run prisma:deploy (solo aplica 0_init sin resetear)"
