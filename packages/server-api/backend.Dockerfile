#
# copy_deps
#
FROM node:18.12.1 AS copy_deps
WORKDIR /app

# copy packages
COPY ./epistogram ./epistogram
COPY ./thinkhub-xlib ./thinkhub-xlib

# clean root
RUN find -mindepth 2 -maxdepth 2 ! -name "package.json" ! -name "packages" -prune -exec rm -r {} \;
# clean packages
RUN find -mindepth 4 ! -name "package.json" -prune -exec rm -r {} \;

#
# builder
#
FROM node:18.12.1 as builder
WORKDIR /app
COPY --from=copy_deps /app .

# bootstrap
RUN yarn --cwd ./epistogram install --immutable --immutable-cache --check-cache --network-timeout 100000

# copy files for build  
COPY ./epistogram/lerna.json ./epistogram/lerna.json
COPY ./epistogram/tsconfig.json ./epistogram/tsconfig.json
COPY ./epistogram/packages ./epistogram/packages
COPY ./thinkhub-xlib/lerna.json ./thinkhub-xlib/lerna.json
COPY ./thinkhub-xlib/tsconfig.json ./thinkhub-xlib/tsconfig.json
COPY ./thinkhub-xlib/packages ./thinkhub-xlib/packages

# build
RUN yarn --cwd ./epistogram build-server

# expose port 5000
EXPOSE 5000

# start container 
CMD node --es-module-specifier-resolution=node ./packages/server-api/dist/server.js
