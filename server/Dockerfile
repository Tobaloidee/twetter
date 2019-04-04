FROM node:11.10-alpine

RUN mkdir /app

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN apk --no-cache --virtual build-dependencies add \
  python \
  make \
  g++ \
  && yarn install \
  && yarn global add typescript ts-node-dev

COPY . .

RUN yarn build

ENV NODE_ENV production

EXPOSE 8080

CMD ["yarn", "start"]