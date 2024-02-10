# Dockerfile in ./docker/deploy/

# Use the official Node.js  20.11.0 LTS image as a base image
FROM node:20.11.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ../../package.json ../../package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY ../../ ./

# Expose the port on which the app will run
EXPOSE  3000

# Run the commands to restart the database and start the Nest app
CMD npm run db:dev:restart && npm run build && npm run start:prod
