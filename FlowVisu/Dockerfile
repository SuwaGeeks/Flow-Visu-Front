FROM node:18
RUN /bin/bash &&\
  apt-get -y update &&\
  apt-get -y upgrade

WORKDIR /app
COPY . /app

RUN yarn build

WORKDIR /app/.output

EXPOSE 3000
CMD node ./server/index.mjs
