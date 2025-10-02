# ---------- Base Stage ----------
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./


RUN npm ci --only=production && npm cache clean --force

# copy source code
COPY . .

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Chanfe ownership of the app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose the port
EXPOSE 3040


# ---------- Development Stage ----------
FROM base AS development
USER root
RUN npm ci && npm cache clean --force
USER nodejs
CMD ["npm", "run", "dev"]

# ---------- Production Stage ----------
FROM base AS production
CMD ["npm", "start"]