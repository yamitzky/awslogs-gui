FROM node:alpine

RUN apk add -U git

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app
RUN yarn

COPY . /usr/src/app
ARG API_BASE_URL
RUN yarn build

FROM nginx:alpine
COPY --from=0 /usr/src/app/dist /usr/share/nginx/html
