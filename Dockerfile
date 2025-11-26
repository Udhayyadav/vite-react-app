# --- Stage 1: Build the React Application ---
# Use a lightweight Node.js image
FROM node:22-alpine as BUILD_IMAGE

# Set the working directory inside the container
WORKDIR /app

# Copy package.json to install dependencies first (better caching)
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the app (this creates the /dist folder inside the container)
RUN npm run build

# --- Stage 2: Serve the App using Nginx ---
# Use a lightweight Nginx web server
FROM nginx:alpine

# Copy the build output from Stage 1 to the Nginx html folder
COPY --from=BUILD_IMAGE /app/dist /usr/share/nginx/html

# Expose port 80 (internal container port)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]