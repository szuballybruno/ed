# Get the latest node image 
FROM node:18.12.1

# set the working directory, in which every command will run
WORKDIR /app

# copy package json files
RUN echo "Copying package.json files..."
COPY ./package.json ./package.json
COPY ./packages/util-script-producer/package.json ./packages/util-script-producer/package.json
COPY ./packages/x-core/package.json ./packages/x-core/package.json
COPY ./packages/x-injector/package.json ./packages/x-injector/package.json

# yarn install
RUN echo "Yarn installing deps..."
RUN yarn --silent

# copy other files
RUN echo "Copying files..."
COPY ./tsconfig.json ./tsconfig.json
COPY ./lerna.json ./lerna.json

COPY ./packages/x-injector/tsconfig.json ./packages/x-injector/tsconfig.json
COPY ./packages/x-injector/src ./packages/x-injector/src

COPY ./packages/x-core/tsconfig.json ./packages/x-core/tsconfig.json
COPY ./packages/x-core/src ./packages/x-core/src

COPY ./packages/util-script-producer/tsconfig.json ./packages/util-script-producer/tsconfig.json
COPY ./packages/util-script-producer/src ./packages/util-script-producer/src
COPY ./packages/util-script-producer/sql ./packages/util-script-producer/sql

COPY ./packages/server-services/sql ./packages/server-services/sql

COPY ./temp/migrationVersionsOnServer.txt ./packages/util-script-producer/migrationVersionsOnServer.txt

# build server-api
RUN echo "Running Yarn build server-api script..."
RUN yarn build-script-producer

# start container 
CMD yarn start-script-producer
