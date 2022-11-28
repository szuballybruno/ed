# Get the latest node image 
FROM node:18.12.1

# set the working directory, in which every command will run
WORKDIR /app

# copy package json files
RUN echo "Copying package.json files..."
COPY ./package.json ./package.json
COPY ./packages/server-tests/package.json ./packages/server-tests/package.json
COPY ./packages/server-api/package.json ./packages/server-api/package.json
COPY ./packages/server-services/package.json ./packages/server-services/package.json
COPY ./packages/commonlogic/package.json ./packages/commonlogic/package.json
COPY ./packages/commontypes/package.json ./packages/commontypes/package.json
COPY ./packages/communication/package.json ./packages/communication/package.json
COPY ./packages/x-gateway/package.json ./packages/x-gateway/package.json
COPY ./packages/x-mapper/package.json ./packages/x-mapper/package.json
COPY ./packages/x-core/package.json ./packages/x-core/package.json
COPY ./packages/x-injector/package.json ./packages/x-injector/package.json
COPY ./packages/x-orm/package.json ./packages/x-orm/package.json

# yarn install
RUN echo "Yarn installing deps..."
RUN yarn --silent

# copy other files
RUN echo "Copying files..."
COPY ./tsconfig.json ./tsconfig.json
COPY ./lerna.json ./lerna.json

COPY ./packages/server-tests/tsconfig.json ./packages/server-tests/tsconfig.json
COPY ./packages/server-tests/src ./packages/server-tests/src

COPY ./packages/server-services/tsconfig.json ./packages/server-services/tsconfig.json
COPY ./packages/server-services/src ./packages/server-services/src
COPY ./packages/server-services/emails ./packages/server-services/emails

COPY ./packages/server-api/tsconfig.json ./packages/server-api/tsconfig.json
COPY ./packages/server-api/src ./packages/server-api/src
COPY ./packages/server-api/config ./packages/server-api/config

COPY ./packages/commonlogic/tsconfig.json ./packages/commonlogic/tsconfig.json
COPY ./packages/commonlogic/src ./packages/commonlogic/src

COPY ./packages/commontypes/tsconfig.json ./packages/commontypes/tsconfig.json
COPY ./packages/commontypes/src ./packages/commontypes/src

COPY ./packages/communication/tsconfig.json ./packages/communication/tsconfig.json
COPY ./packages/communication/src ./packages/communication/src
COPY ./packages/communication/rollup.config.js ./packages/communication/rollup.config.js

COPY ./packages/x-mapper/tsconfig.json ./packages/x-mapper/tsconfig.json
COPY ./packages/x-mapper/src ./packages/x-mapper/src

COPY ./packages/x-gateway/tsconfig.json ./packages/x-gateway/tsconfig.json
COPY ./packages/x-gateway/src ./packages/x-gateway/src

COPY ./packages/x-injector/tsconfig.json ./packages/x-injector/tsconfig.json
COPY ./packages/x-injector/src ./packages/x-injector/src

COPY ./packages/x-core/tsconfig.json ./packages/x-core/tsconfig.json
COPY ./packages/x-core/src ./packages/x-core/src

COPY ./packages/x-orm/tsconfig.json ./packages/x-orm/tsconfig.json
COPY ./packages/x-orm/src ./packages/x-orm/src

# build server-tests
RUN echo "Running Yarn build server-tests script..."
RUN yarn build-tests

# start container 
CMD yarn start-tests
