#
# copy_deps 
#
FROM node:18.12.1 AS copy_deps
WORKDIR /app

# copy packages
COPY ./package.json .
COPY ./packages ./packages
COPY ./xlib/package.json .
COPY ./xlib/packages ./xlib/packages

# delete everything but package.json files
RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

#
# builder
#
FROM cypress/browsers:node18.12.0-chrome107 as build-and-runner
WORKDIR /app
COPY --from=copy_deps /app .

# setup lerna 
COPY ./lerna.json .
RUN yarn global add lerna

# bootstrap
RUN npx lerna bootstrap --scope=@episto/tests-client

# copy files for build 
COPY ./xlib/tsconfig.json ./xlib/tsconfig.json
COPY ./xlib/packages ./xlib/packages
COPY ./tsconfig.json ./tsconfig.json
COPY ./packages ./packages

# build
RUN yarn lerna run build --scope=@episto/tests-client --include-dependencies

# entry
CMD yarn lerna run start-cy --scope=@episto/tests-client