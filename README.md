<div align="center">

# Nombre del Proyecto

![Logo del proyecto](/src/assets/images/Logo.png)

[![Licencia](https://img.shields.io/badge/licencia-MIT-blue.svg)](LICENSE)
[![Estado](https://img.shields.io/badge/estado-activo-brightgreen.svg)](https://github.com/sapitorico/express-typescript-template/actions)

</div>

**Nombre** descripcion breve del proyecto.

## 📖 Tabla de contenidos

- [✨ Características](#-características)
- [🚀 Guía de inicio rápido](#-guía-de-inicio-rápido)
  - [Requisitos previos](#requisitos-previos)
  - [Instalación](#instalación)
  - [Configuración](#configuración)
  - [Base de datos](#base-de-datos)
  - [Desarrollo](#desarrollo)
  - [Despliegue](#despliegue)
- [🧩 Estructura del proyecto](#-estructura-del-proyecto)
- [🤝 Cómo contribuir](#-cómo-contribuir)
- [👏 Reconocimientos](#-reconocimientos)
- [📄 Licencia](#-licencia)

## ✨ Características

Describe aquí las principales características de tu proyecto. Por ejemplo:

- 🚀 Construido con Express.js
- 🔒 Manejo de rutas, middlewares y autenticación personalizados
- 🛠 Estructura modular para fácil mantenimiento y escalabilidad
- 📦 Integración con bases de datos (PostgreSQL)
- 🔄 API REST optimizada para el consumo desde frontend o apps móviles
- 🧪 Soporte para pruebas con Jest
- 🌐 CORS configurado para seguridad y acceso controlado
- ✨ Preparado para deploy en servicios VPS propio
- 🛠 Soporte para TypeScript

## 🚀 Guía de inicio rápido

### Requisitos previos

- Node.js v22+
- pnpm (recomendado)
- Docker
- Docker Compose
- Git

### Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/sapitorico/express-typescript-template.git
```

2. Entre en el root del repo:

```bash
cd express-typescript-template
```

3. Instala las dependencias:

```bash
pnpm install
```

### Configuración

Crea un archivo .env en la raíz del repositorio con las siguientes variables:

```env
# api env
NODE_ENV=development    //development, production, test
PORT=3000

# compose envs
POSTGRES_DB="mydb"
POSTGRES_USER="root"
POSTGRES_PASSWORD="1234"

# prisma envs
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}?schema=public"
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```

### Base de datos

Levanta la base de datos con Docker Compose:

   ```bash
   docker compose --env-file .env up --build -d db
   ```

Ejecuta la migración:

   ```bash
   pnpm prisma:init
   ```

### Desarrollo

| Comando                | Acción                                                                      |
| :--------------------- | :-------------------------------------------------------------------------- |
| `pnpm dev`             | Inicia servidor de desarrollo en `localhost:3000`                           |
| `pnpm build`           | Construye para producción en `./build/`                                     |
| `pnpm start`           | Previsualiza la compilación localmente                                      |
| `pnpm format`          | Formatea el código automáticamente                                          |
| `pnpm prisma:init`     | Ejecuta el archivo de migración SQL `./prisma/migrate/0_init/migration.sql` |
| `pnpm prisma:generate` | Genera el Cliente Prisma                                                    |
| `pnpm prisma:studio`   | Ejecuta el editor visual de los datos de la base de datos                   |

### Despliegue

Este proyecto está preparado para desplegarse en:

<!-- - [![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com) -->

Simplemente conecta tu repositorio y selecciona el framework Astro.

## 🧩 Estructura del proyecto

```
└── 📁proyect
    └── 📁public        # Archivos estáticos (favicons, fonts)
    └── 📁src
    │   └── 📁assets    # Imágenes, SVG
    │   └── 📁components
    │   └── 📁consts
    │   └── 📁interfaces
    │   └── 📁layouts
    │   └── 📁pages
    │   └── 📁scripts
    │   └── 📁sections
    │   └── 📁styles
    │   └── 📁types
    │   └── 📁utils
    └── astro.config.mjs
    └── package.json
    └── tsconfig.json
```

## 🤝 Cómo contribuir

¡Las contribuciones son bienvenidas! Por favor lee nuestra [guía de contribución](CONTRIBUTING.md) para empezar.

1. Clona el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 👏 Reconocimientos

- [Astro](https://astro.build) - El increíble framework que hace posible este proyecto
- [Tailwind CSS](https://tailwindcss.com) - Para estilizar la aplicación

## 🛠️ Tecnologías

[![Astro](https://img.shields.io/badge/Astro-fff?style=for-the-badge&logo=astro&logoColor=bd303a&color=352563)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## 👨‍💻 Autor(es)

- **Renzo Yaque** - [GitHub](https://github.com/sapitorico)

## 🤝 Colaboradores

[![Contribuidores](https://contrib.rocks/image?repo=sapitorico/astro-typescript-template&max=500&columns=20)](https://github.com/sapitorico/astro-typescript-template/graphs/contributors)

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

<div align="right">
  <a href="#" style="
    display: inline-block;
    padding: 5px 10px;
    background: #2563eb;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-size: 14px;
  ">↑ Subir</a>
</div>
