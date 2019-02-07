FROM node:11.9.0

LABEL maintainer="DarkXipher"

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
ENV APP=/home/node/sudobot

# Create directory for our app
RUN mkdir -p $APP

# Change directory so our commands run inside 
WORKDIR $APP

# Copy dependency definitions
COPY package.json $APP

# Install dependencies & install pm2 runtime
RUN npm install --loglevel=warn && npm install pm2 -g

#RUN cd /tmp && npm install --loglevel=warn \
#  && mkdir -p $APP \
#  && mv /tmp/node_modules $APP

# Copy code needed to run the app
COPY src $APP/src

# expose the port the app runs in
EXPOSE 5060

# serve the app
CMD [ "pm2-runtime", "src/testapp.js" ]