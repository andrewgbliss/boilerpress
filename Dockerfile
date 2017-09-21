FROM node:8.5.0-alpine

RUN mkdir -p /usr/src/app

COPY ./package.json /usr/src

WORKDIR /usr/src

RUN npm i

COPY ./src /usr/src/app

WORKDIR /usr/src/app

CMD npm start