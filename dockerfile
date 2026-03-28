# Stage 1: Build the React/Vite app
FROM node:20-alpine AS build

WORKDIR /app

# 1. Install dependencies (Cached layer)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# 2. Copy source code
COPY . .

# 3. Handle Environment Variables for Vite
# (Must be present DURING 'npm run build')
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# 4. Build the project
RUN npm run build

# Stage 2: Serve the static files with Nginx
FROM nginx:stable-alpine

# Copy your custom Nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the static assets from the 'build' stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]