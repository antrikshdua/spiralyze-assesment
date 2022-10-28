FROM node:alpine

RUN mkdir -p /usr/dist/spiralyze-assesment && chown -R node:node /usr/dist/spiralyze-assesment

WORKDIR /usr/dist/spiralyze-assesment

COPY package.json  ./

USER node

RUN npm install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 3000
