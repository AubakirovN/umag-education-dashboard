# Use an official node runtime as a parent image
FROM node:latest

ARG VITE_API_BASE_URL="https://umag.kz/api"
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files into the container at /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container at /app
COPY . .

# Build the application
RUN npm run build

# Use an official nginx runtime as a parent image
FROM nginx:latest

# Copy the nginx.conf file into the container at /etc/nginx/nginx.conf
COPY .github/config/nginx.conf /etc/nginx/nginx.conf

# Copy the build output from the previous stage into the current stage
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose port 80 to the Docker host, so we can access it from the outside
EXPOSE 80

# Start nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]