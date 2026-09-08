FROM node:22-slim AS base
WORKDIR /app

RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

COPY package*.json .npmrc ./
RUN npm ci

COPY . .
RUN npm run build

RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 3000
ENV NODE_ENV=production

CMD ["npm", "run", "start"]
