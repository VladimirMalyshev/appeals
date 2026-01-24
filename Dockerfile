FROM node:23-alpine AS builder

LABEL maintainer="Malyshev Vladimir"

ENV ENVIRONMENT=stage

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:23-alpine AS runner

LABEL maintainer="Malyshev Vladimir"

ENV ENVIRONMENT=stage

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN chown -R appuser:appgroup /app

USER appuser

RUN npm ci --omit=dev

EXPOSE 4000

CMD [ "sh", "-c", "npm run prisma:migrate && node dist/src/main.js" ]