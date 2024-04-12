# Use the official Node.js base image
FROM node:20

# Set the working directory inside the container
WORKDIR /home/node/app

# Copy the React project files to the container
COPY . ./

# Install dependencies
RUN npm install

# Build the React application
RUN npm run build

# Set the port to 5173 (for development)
EXPOSE 3000

# Serve the built React application
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]