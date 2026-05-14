# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist/src ./dist
COPY --from=build /app/node_modules ./node_modules
ENV NODE_ENV=production
USER node
CMD ["node", "dist/main.js"]