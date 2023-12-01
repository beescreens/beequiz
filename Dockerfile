## First stage: Build the application
FROM node:20-alpine as build

# Work directory
WORKDIR /app

# Copy package files
COPY package.json package.json
COPY package-lock.json package-lock.json

# Install dependencies
RUN npm ci

# Copy source files
COPY src src
COPY static static
COPY .npmrc .npmrc
COPY components.json components.json
COPY postcss.config.cjs postcss.config.cjs
COPY svelte.config.js svelte.config.js
COPY tailwind.config.js tailwind.config.js
COPY tsconfig.json tsconfig.json
COPY vite.config.ts vite.config.ts

# Build the application
RUN npm run build

## Second stage: Create the production image
FROM node:20-alpine as production

# Work directory
WORKDIR /app

# Copy package files
COPY --from=build /app/package.json package.json
COPY --from=build /app/package-lock.json package-lock.json

# Install production dependencies
RUN npm ci --omit=dev

# Copy built application from build stage
COPY --from=build /app/build .

# Environment variables
ENV NODE_ENV=production

# Exposed ports
EXPOSE 3000

# Command to run on start
CMD ["node", "index.js"]
