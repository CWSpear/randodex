FROM node:lts AS build

WORKDIR /build/

COPY ./package.json ./package-lock.json ./

RUN --mount=type=cache,target=/root/.npm,id=matchbook-lab_npm-cache npm ci

COPY ./ ./

RUN --mount=type=cache,target=/build/.cache/,id=randodex_build-cache npm run build:server

FROM node:lts-alpine

WORKDIR /app/

COPY --from=build --chown=nginx:nginx /build/package.json /build/package-lock.json ./
COPY --from=build --chown=nginx:nginx /build/server/ ./server/
COPY --from=build --chown=nginx:nginx /build/node_modules/ ./node_modules/

CMD ["node", "--enable-source-maps", "./server/dist/main.js"]