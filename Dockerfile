FROM node:lts AS build

WORKDIR /build/

COPY ./package.json ./package-lock.json ./

RUN --mount=type=cache,target=/root/.npm,id=matchbook-lab_npm-cache npm install

COPY ./ ./

RUN --mount=type=cache,target=/build/.cache/,id=randodex_build-cache npm run build:client

FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html/

COPY --from=build --chown=nginx:nginx /build/client/dist/ ./
