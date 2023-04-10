#
# builder
#
FROM localhost:6000/monodeps:latest as server-builder
WORKDIR /app

# build
RUN yarn build-server-api

#
# runner
#
FROM node:18.12-slim as server-runner
WORKDIR /app

COPY --from=server-builder /app/node_modules ./node_modules
COPY --from=server-builder /app/lerna.json .
COPY --from=server-builder /app/tsconfig.json .
COPY --from=server-builder /app/package.json .
COPY --from=server-builder /app/packages ./packages

# expose port 5000
EXPOSE 5000

# start container
CMD yarn start-server-dist
