FROM node:11.10-alpine

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

EXPOSE 8080

CMD yarn start:prod