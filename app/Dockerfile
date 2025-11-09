# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port (Cloud Run uses PORT env var, defaulting to 8080)
ENV PORT=8080
EXPOSE 8080

# Start nginx
CMD sed -i "s/listen 80/listen $PORT/g" /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
