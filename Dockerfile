# 1) Dependências
FROM node:20-alpine AS deps
WORKDIR /app

# Copia manifests primeiro (melhor cache)
COPY package.json package-lock.json ./
RUN npm ci

# 2) Build
FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build do Next
RUN npm run build

# 3) Runtime (standalone)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# (opcional) segurança
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copia apenas o necessário
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
