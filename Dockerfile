FROM node:20-alpine

USER node
WORKDIR /home/node

COPY api/package*.json api/yarn.lock ./
RUN yarn install --frozen-lockfile

COPY --chown=node:node api .

# Start NestJS server
CMD ["yarn", "start:prod"]
