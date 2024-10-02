FROM node:20-alpine
RUN which curl || apk add --no-cache curl

USER node
WORKDIR /home/node

COPY api/package*.json api/yarn.lock ./
RUN yarn install --frozen-lockfile

COPY --chown=node:node api .

RUN yarn build
# Start NestJS server
CMD ["yarn", "start:prod"]
