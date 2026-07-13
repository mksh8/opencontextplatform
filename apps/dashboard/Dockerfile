# Build Stage
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production Stage (Nginx)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose Vite's default production port or Nginx's default
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
