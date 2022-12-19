#
# copy_deps 
#
FROM node:18.12.1 AS copy_deps
WORKDIR /app

# copy packages
COPY ./package.json ./package.json
COPY ./packages ./packages
COPY ./xlib/package.json ./xlib/package.json
COPY ./xlib/packages ./xlib/packages

# delete everything but package.json files
RUN find ./packages \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf
RUN find ./xlib/packages \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

#
# builder
#
FROM node:18.12.1 as builder
WORKDIR /app
COPY --from=copy_deps /app .

# setup lerna 
COPY ./lerna.json .
RUN yarn global add lerna

# bootstrap
RUN npx lerna bootstrap --scope=@episto/server-api

# copy files for build 
COPY ./xlib/tsconfig.json ./xlib/tsconfig.json
COPY ./xlib/packages ./xlib/packages
COPY ./tsconfig.json ./tsconfig.json
COPY ./packages ./packages

# build
RUN yarn build-server

# expose port 5000
EXPOSE 5000

# start container 
CMD node --es-module-specifier-resolution=node ./packages/server-api/dist/server.js
