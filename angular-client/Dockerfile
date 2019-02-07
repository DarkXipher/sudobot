# Create image based on the official Node 6 image from dockerhub
FROM node:6

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

# Install dependecies
RUN npm install

# Get all the code needed to run the app
#may need to add a dockerignore file to remove node_modules.
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 4200

#make sure to change package.json "start" to use ng serve -H 0.0.0.0

# Serve the app
CMD ["npm", "start"]