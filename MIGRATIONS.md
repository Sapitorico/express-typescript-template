# Guía de Migraciones

Esta plantilla utiliza un enfoque simplificado para migraciones de Prisma, manteniendo siempre una única migración inicial `0_init` que refleja el estado actual del schema.

## 📋 Filosofía

- **Sin historial de cambios**: Ideal para plantillas y proyectos en desarrollo inicial
- **Una sola migración**: `0_init` siempre representa el estado completo del schema
- **Regeneración automática**: Fácil actualización cuando modificas `schema.prisma`

## 🚀 Comandos Disponibles

### Desarrollo

```bash
# Regenerar la migración 0_init desde el schema actual
npm run prisma:regenerate

# Resetear completamente la base de datos y aplicar 0_init
npm run prisma:reset

# Abrir Prisma Studio para ver/editar datos
npm run prisma:studio

# Generar Prisma Client (después de cambios en schema)
npm run prisma:generate
```

### Producción/Staging

```bash
# Aplicar migración 0_init a la base de datos
npm run prisma:deploy
```

## 🔄 Flujo de Trabajo

### Cuando modificas el schema

1. Edita `prisma/schema.prisma` con tus cambios
2. Regenera la migración inicial:
   ```bash
   npm run prisma:regenerate
   ```
3. Aplica los cambios a tu base de datos local:
   ```bash
   npm run prisma:reset
   ```

### Para nuevos colaboradores

Si clonas este proyecto por primera vez:

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env

# Crear base de datos y aplicar migración inicial
npm run prisma:reset
```

### Base de datos existente

Si ya tienes una base de datos con el schema correcto:

```bash
# Solo marcar la migración como aplicada
npx prisma migrate resolve --applied 0_init
```

## 📁 Estructura

```
prisma/
├── schema.prisma          # Define tu modelo de datos
└── migrations/
    └── 0_init/
        └── migration.sql  # Migración inicial (auto-generada)
```

## ⚠️ Importante

- **NO edites** manualmente `prisma/migrations/0_init/migration.sql`
- **NO uses** `prisma migrate dev` directamente (usa `npm run prisma:regenerate`)
- Este enfoque es para **desarrollo/plantillas**, no para producción con datos críticos

## 🔧 Scripts Internos

Los comandos npm ejecutan estos scripts:

- `prisma:regenerate` → `./scripts/reset-migration.sh`
  - Elimina migraciones antiguas
  - Genera `0_init/migration.sql` desde el schema

- `prisma:reset` → `npx prisma migrate reset --force --skip-seed`
  - Elimina la base de datos
  - Recrea la base de datos
  - Aplica todas las migraciones

- `prisma:deploy` → `npx prisma migrate deploy`
  - Aplica migraciones pendientes
  - Seguro para producción

## 📚 Recursos

- [Prisma Migrate Docs](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Baselining Guide](https://www.prisma.io/docs/guides/migrate/production-troubleshooting#baselining)
