# Get the latest node image 
FROM node:18.12.1

# set the working directory, in which every command will run
WORKDIR /app

# copy package json files
RUN echo "Copying root package.json..."
COPY ./package.json ./package.json

RUN echo "Copying server-api package.json..."
COPY ./packages/server-api/package.json ./packages/server-api/package.json

RUN echo "Copying server-services package.json..."
COPY ./packages/server-services/package.json ./packages/server-services/package.json

RUN echo "Copying commonlogic package.json..."
COPY ./packages/commonlogic/package.json ./packages/commonlogic/package.json

RUN echo "Copying commontypes package.json..."
COPY ./packages/commontypes/package.json ./packages/commontypes/package.json

RUN echo "Copying communication package.json..."
COPY ./packages/communication/package.json ./packages/communication/package.json

RUN echo "Copying x-gateway package.json..."
COPY ./packages/x-gateway/package.json ./packages/x-gateway/package.json

RUN echo "Copying x-mapper package.json..."
COPY ./packages/x-mapper/package.json ./packages/x-mapper/package.json

RUN echo "Copying x-core package.json..."
COPY ./packages/x-core/package.json ./packages/x-core/package.json

RUN echo "Copying x-injector package.json..."
COPY ./packages/x-injector/package.json ./packages/x-injector/package.json

RUN echo "Copying x-orm package.json..."
COPY ./packages/x-orm/package.json ./packages/x-orm/package.json

# yarn install (no-lockfile)
RUN echo "Yarn installing deps..."
RUN yarn --no-lockfile

# copy other files
RUN echo "Copying root files..."
COPY ./tsconfig.json ./tsconfig.json
COPY ./lerna.json ./lerna.json

RUN echo "Copying server-services files..."
COPY ./packages/server-services/tsconfig.json ./packages/server-services/tsconfig.json
COPY ./packages/server-services/src ./packages/server-services/src
COPY ./packages/server-services/emails ./packages/server-services/emails

RUN echo "Copying server-api files..."
COPY ./packages/server-api/tsconfig.json ./packages/server-api/tsconfig.json
COPY ./packages/server-api/src ./packages/server-api/src
COPY ./packages/server-api/config ./packages/server-api/config

RUN echo "Copying commonlogic files..."
COPY ./packages/commonlogic/tsconfig.json ./packages/commonlogic/tsconfig.json
COPY ./packages/commonlogic/src ./packages/commonlogic/src

RUN echo "Copying commontypes files..."
COPY ./packages/commontypes/tsconfig.json ./packages/commontypes/tsconfig.json
COPY ./packages/commontypes/src ./packages/commontypes/src

RUN echo "Copying communication files..."
COPY ./packages/communication/tsconfig.json ./packages/communication/tsconfig.json
COPY ./packages/communication/src ./packages/communication/src
COPY ./packages/communication/rollup.config.js ./packages/communication/rollup.config.js

RUN echo "Copying x-mapper files..."
COPY ./packages/x-mapper/tsconfig.json ./packages/x-mapper/tsconfig.json
COPY ./packages/x-mapper/src ./packages/x-mapper/src

RUN echo "Copying x-gateway files..."
COPY ./packages/x-gateway/tsconfig.json ./packages/x-gateway/tsconfig.json
COPY ./packages/x-gateway/src ./packages/x-gateway/src

RUN echo "Copying x-injector files..."
COPY ./packages/x-injector/tsconfig.json ./packages/x-injector/tsconfig.json
COPY ./packages/x-injector/src ./packages/x-injector/src

RUN echo "Copying x-core files..."
COPY ./packages/x-core/tsconfig.json ./packages/x-core/tsconfig.json
COPY ./packages/x-core/src ./packages/x-core/src

RUN echo "Copying x-orm files..."
COPY ./packages/x-orm/tsconfig.json ./packages/x-orm/tsconfig.json
COPY ./packages/x-orm/src ./packages/x-orm/src

# build server-api
RUN echo "Running Yarn build server-api script..."
RUN yarn build-server

# expose port 5000
EXPOSE 5000

# start container 
CMD node --es-module-specifier-resolution=node ./packages/server-api/dist/server.js
