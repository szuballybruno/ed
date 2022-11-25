# Get the latest node image 
FROM node:18.12.1

# set the working directory, in which every command will run
WORKDIR /app

# copy package json files
RUN echo "Copying root package.json..."
COPY ./package.json ./package.json

RUN echo "Copying backend package.json..."
COPY ./packages/backend/package.json ./packages/backend/package.json

RUN echo "Copying frontend package.json..."
COPY ./packages/frontend/package.json ./packages/frontend/package.json

RUN echo "Copying commonlogic package.json..."
COPY ./packages/commonlogic/package.json ./packages/commonlogic/package.json

RUN echo "Copying commontypes package.json..."
COPY ./packages/commontypes/package.json ./packages/commontypes/package.json

RUN echo "Copying communication package.json..."
COPY ./packages/communication/package.json ./packages/communication/package.json
COPY ./packages/communication/rollup.config.js ./packages/communication/rollup.config.js

RUN echo "Copying xmapper package.json..."
COPY ./packages/xmapper/package.json ./packages/xmapper/package.json

RUN echo "Copying xcore package.json..."
COPY ./packages/xcore/package.json ./packages/xcore/package.json

RUN echo "Copying xinjector package.json..."
COPY ./packages/xinjector/package.json ./packages/xinjector/package.json

RUN echo "Copying xorm package.json..."
COPY ./packages/xorm/package.json ./packages/xorm/package.json

# yarn install (no-lockfile)
RUN echo "Yarn installing deps..."
RUN yarn --no-lockfile

# copy other files
RUN echo "Copying root files..."
COPY ./tsconfig.json ./tsconfig.json
COPY ./lerna.json ./lerna.json

RUN echo "Copying backend files..."
COPY ./packages/backend/tsconfig.json ./packages/backend/tsconfig.json
COPY ./packages/backend/src ./packages/backend/src
COPY ./packages/backend/config ./packages/backend/config
COPY ./packages/backend/emails ./packages/backend/emails

RUN echo "Copying frontend files..."
COPY ./packages/frontend/tsconfig.json ./packages/frontend/tsconfig.json
COPY ./packages/frontend/src ./packages/frontend/src

RUN echo "Copying commonlogic files..."
COPY ./packages/commonlogic/tsconfig.json ./packages/commonlogic/tsconfig.json
COPY ./packages/commonlogic/src ./packages/commonlogic/src

RUN echo "Copying commontypes files..."
COPY ./packages/commontypes/tsconfig.json ./packages/commontypes/tsconfig.json
COPY ./packages/commontypes/src ./packages/commontypes/src

RUN echo "Copying communication files..."
COPY ./packages/communication/tsconfig.json ./packages/communication/tsconfig.json
COPY ./packages/communication/src ./packages/communication/src

RUN echo "Copying xmapper files..."
COPY ./packages/xmapper/tsconfig.json ./packages/xmapper/tsconfig.json
COPY ./packages/xmapper/src ./packages/xmapper/src

RUN echo "Copying xinjector files..."
COPY ./packages/xinjector/tsconfig.json ./packages/xinjector/tsconfig.json
COPY ./packages/xinjector/src ./packages/xinjector/src

RUN echo "Copying xcore files..."
COPY ./packages/xcore/tsconfig.json ./packages/xcore/tsconfig.json
COPY ./packages/xcore/src ./packages/xcore/src

RUN echo "Copying xorm files..."
COPY ./packages/xorm/tsconfig.json ./packages/xorm/tsconfig.json
COPY ./packages/xorm/src ./packages/xorm/src

# build backend
RUN echo "Running Yarn build backend script..."
RUN yarn buildback

# expose port 5000
EXPOSE 5000

# start container 
CMD node --es-module-specifier-resolution=node ./packages/backend/build/server.js
