#
# copy_deps
#
FROM node:18.12.1 AS copy_deps
WORKDIR /app

# copy epistogram
COPY ./epistogram ./

# clean root & clean packages
RUN find -maxdepth 1 -mindepth 1 ! -name "packages" ! -name "package.json" -prune -exec rm -r {} \;
RUN find -mindepth 3 ! -name "package.json" -prune -exec rm -r {} \;

# copy xlib
COPY ./thinkhub-xlib ./thinkhub-xlib

# clean root & clean packages
RUN find ./thinkhub-xlib -maxdepth 1 -mindepth 1 ! -name "packages" ! -name "package.json" -prune -exec rm -r {} \;
RUN find ./thinkhub-xlib -mindepth 3 ! -name "package.json" -prune -exec rm -r {} \;

#
# builder
#
FROM node:18.12.1 as builder
WORKDIR /app
COPY --from=copy_deps /app .

# bootstrap
RUN yarn install --immutable --immutable-cache --check-cache --network-timeout 100000

# copy files for build  
COPY ./epistogram/lerna.json ./lerna.json
COPY ./epistogram/tsconfig.json ./tsconfig.json
COPY ./epistogram/packages ./packages
COPY ./thinkhub-xlib/lerna.json ./thinkhub-xlib/lerna.json
COPY ./thinkhub-xlib/tsconfig.json ./thinkhub-xlib/tsconfig.json
COPY ./thinkhub-xlib/packages ./thinkhub-xlib/packages