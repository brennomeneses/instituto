
# 1) Dependências
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci


# 2) Build
FROM node:20-alpine AS builder

WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build


# 3) Runtime
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001

# Arquivos públicos
COPY --from=builder /app/public ./public

# Arquivos do Next.js
COPY --from=builder --chown=nextjs:nodejs \
    /app/.next/static ./.next/static

COPY --from=builder --chown=nextjs:nodejs \
    /app/.next/standalone ./

# Prepara o cache com permissões corretas
RUN mkdir -p /app/.next/cache \
    && chown -R nextjs:nodejs /app/.next

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
