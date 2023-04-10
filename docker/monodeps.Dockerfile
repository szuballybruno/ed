#
# deps
#
FROM node:18.12.1-alpine as monodeps-files
WORKDIR /app

# copy epistogram
COPY ./epistogram ./

# clean root & clean packages
RUN find -maxdepth 1 -mindepth 1 ! -name "packages" ! -name "package.json" -prune -exec rm -r {} \;
RUN find -mindepth 3 ! -name "package.json" -prune -exec rm -r {} \;

# copy xlib
# COPY ./thinkhub-xlib ./thinkhub-xlib

# clean root & clean packages
# RUN find ./thinkhub-xlib -maxdepth 1 -mindepth 1 ! -name "packages" ! -name "package.json" -prune -exec rm -r {} \;
# RUN find ./thinkhub-xlib -mindepth 3 ! -name "package.json" -prune -exec rm -r {} \;

#
# builder
#
FROM node:18.12.1-alpine as monodeps-npm
WORKDIR /app

COPY --from=monodeps-files /app ./

# bootstrap
RUN yarn install --immutable --immutable-cache --check-cache --network-timeout 100000

#
# builder
#
FROM node:18.12.1-alpine as monodeps-final
WORKDIR /app

COPY --from=deps /app ./

# copy folders containing node_modules
COPY --from=monodeps-npm /app/node_modules ./node_modules
COPY --from=monodeps-npm /app/packages ./packages

# copy folders containing src files
COPY ./epistogram/lerna.json .
COPY ./epistogram/package.json .
COPY ./epistogram/tsconfig.json .
COPY ./epistogram/packages ./packages
