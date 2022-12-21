#
# builder
#
FROM monodeps:latest as builder
WORKDIR /app

# build
RUN yarn build-server

#
# runner
#
FROM node:18.12-slim as runner
WORKDIR /app
COPY --from=builder /app/packages/server-api/dist /app/packages/server-api/dist

# expose port 5000
EXPOSE 5000

# start container
CMD node --es-module-specifier-resolution=node ./packages/server-api/dist/server.js
