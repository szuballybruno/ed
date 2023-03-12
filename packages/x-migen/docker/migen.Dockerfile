#
# copy_deps 
#
FROM node:18.12.1-slim AS copy_deps
WORKDIR /app

# copy packages
COPY ./package.json .
COPY ./packages ./packages

RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

#
# bootstrap_deps
#
FROM node:18.12.1-slim AS bootstrap_deps
WORKDIR /app
COPY --from=copy_deps /app .

RUN yarn install --immutable --immutable-cache --check-cache --network-timeout 100000

#
# builder
#
FROM node:18.12.1-slim AS builder
WORKDIR /app
COPY --from=bootstrap_deps /app .

COPY ./tsconfig.json ./tsconfig.json
COPY ./packages ./packages
COPY ./lerna.json .

RUN yarn lerna run build --scope=@episto/x-migen --include-dependencies

# entry
CMD yarn --cwd ./packages/x-migen/ start "--dbname=${dbname}" "--dbhost=${dbhost}" "--dbusername=${dbusername}" "--dbport=${dbport}" "--dbpassword=${dbpassword}" "--outFolderPath=${outFolderPath}" "--schemaFolderPath=${schemaFolderPath}" "--mode=${mode}"