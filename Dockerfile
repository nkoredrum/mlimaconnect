# Build stage
FROM node:16-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

COPY .npmrc ./


# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .


# Production stage
FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/.env* ./
COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/server.js .

# Expose port
EXPOSE 3000

# Run the application
CMD ["node", "server.js"]
