#
# deps
#
FROM node:18.12.1 as deps
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
COPY --from=deps /app ./

# bootstrap
RUN yarn install --immutable --immutable-cache --check-cache --network-timeout 100000
