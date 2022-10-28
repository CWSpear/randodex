FROM node:lts AS build

WORKDIR /build/

COPY ./package.json ./package-lock.json ./

RUN --mount=type=cache,target=/root/.npm,id=matchbook-lab_npm-cache npm install

COPY ./ ./

RUN --mount=type=cache,target=/build/.cache/,id=randodex_build-cache npm run build:server

FROM node:lts-alpine

WORKDIR /app/

COPY --from=build --chown=nginx:nginx /build/server/ ./

CMD ["node", "--enable-source-maps", "./dist/main.js"]