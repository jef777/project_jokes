# Stage 1: Build the client application
FROM  node:16-alpine as build-stage

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install client dependencies
RUN npm ci --legacy-peer-deps

# Copy the client code to the container
COPY . .

# Set the environment variable(s) for the client
RUN if [ -f "$ENV_FILE" ]; then export $(cat "$ENV_FILE" | xargs) ; fi

# Build the client application
RUN npm run build

# Stage 2: Serve the built client application using NGINX
FROM nginx:latest

# Remove the default NGINX configuration
RUN rm -rf /etc/nginx/conf.d/*

# Copy the built client application to NGINX
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy your custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default NGINX port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
