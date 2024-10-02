FROM node:20-alpine

USER node
WORKDIR /home/node

COPY api/package*.json api/yarn.lock ./
RUN yarn install --frozen-lockfile

COPY --chown=node:node api .

RUN yarn build

FROM node:20-alpine
RUN which curl || apk add --no-cache curl

USER node
WORKDIR /home/node
COPY --from=0 /home/node/dist ./dist
COPY --from=0 /home/node/node_modules ./node_modules
COPY --from=0 /home/node/package.json ./package.json
COPY --from=0 /home/node/yarn.lock ./yarn.lock
COPY --from=0 /home/node/tsconfig.build.json ./tsconfig.build.json
COPY --from=0 /home/node/tsconfig.json ./tsconfig.json

# Start NestJS server
CMD ["yarn", "start:prod"]
