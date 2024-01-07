FROM node:20-alpine3.17

WORKDIR /usr/app

COPY ./package.json ./

RUN yarn

COPY ./ ./

RUN yarn tsc

EXPOSE 3000

CMD [ "yarn", "dev" ]