#
# runner
#
FROM cypress/browsers:node18.12.0-chrome107 as build-and-runner
WORKDIR /app

# copy package.json
COPY ./epistogram/package.json ./package.json
COPY ./epistogram/packages/tests-client/package.json ./packages/tests-client/package.json

# bootstrap
RUN yarn install --immutable --immutable-cache --check-cache --network-timeout 100000

# copy files 
COPY ./epistogram/tsconfig.json ./tsconfig.json
COPY ./epistogram/packages/tests-client ./packages/tests-client 

# entry
CMD yarn --cwd ./packages/tests-client start-cy