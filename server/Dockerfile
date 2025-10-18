# ---------- builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Copy manifests first for better layer caching
COPY package.json package-lock.json* ./

# If lockfile exists -> npm ci, else -> npm install
RUN if [ -f package-lock.json ]; then \
      npm ci --no-audit --no-fund; \
    else \
      npm install --no-audit --no-fund; \
    fi

# Copy source
COPY . .

# ---------- runtime ----------
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
# Copy node_modules and source from builder
COPY --from=builder /app /app

EXPOSE 8080
CMD ["npm","run","start"]
