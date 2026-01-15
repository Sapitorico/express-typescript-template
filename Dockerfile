# COMPILATION STAGE
FROM node:lts-alpine AS build

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN  pnpm install

COPY . .

RUN npx prisma generate
RUN pnpm build

# EXECUTION STAGE
FROM node:lts-alpine

WORKDIR /app

RUN apk add --no-cache openssl && corepack enable

COPY --from=build /app/package.json /app/pnpm-lock.yaml ./
COPY --from=build /app/generated ./generated

RUN pnpm install --prod

COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["pnpm", "start"]


# # COMPILATION STAGE
# FROM node:lts-alpine AS build

# WORKDIR /app

# RUN corepack enable

# COPY package.json pnpm-lock.yaml ./

# RUN  pnpm install

# COPY . .

# RUN npx prisma generate

# RUN pnpm build

# # EXECUTION STAGE
# FROM node:lts-alpine

# WORKDIR /app

# # Instalar OpenSSL requerido por Prisma
# RUN apk add --no-cache openssl

# RUN corepack enable

# COPY --from=build /app/package.json /app/pnpm-lock.yaml ./
# # COPY --from=build /app/prisma ./prisma
# # COPY --from=build /app/generated ./generated

# RUN pnpm install --prod

# COPY --from=build /app/build ./build

# EXPOSE 3000

# CMD ["sh", "-c", "pnpm db:deploy && pnpm start"]
