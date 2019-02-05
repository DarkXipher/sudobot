FROM node

LABEL maintainer="DarkXipher"

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
ENV APP=/home/node/sudobot

RUN npm install pm2 -g

COPY package.json /tmp/package.json

RUN cd /tmp && npm install --loglevel=warn \
  && mkdir -p $APP \
  && mv /tmp/node_modules $APP

COPY src $APP/src

WORKDIR $APP

EXPOSE 5060

CMD [ "pm2-runtime", "src/index.js" ]