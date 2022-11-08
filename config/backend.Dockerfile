# Get the latest node image 
FROM node:18.7.0

# set the working directory, in which every command will run
WORKDIR /app

# copy
RUN echo "Copying root files..."
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json

RUN echo "Copying backend files..."
COPY ./packages/backend/package.json ./packages/backend/package.json
COPY ./packages/backend/tsconfig.json ./packages/backend/tsconfig.json
COPY ./packages/backend/src ./packages/backend/src
COPY ./packages/backend/config ./packages/backend/config
COPY ./packages/backend/emails ./packages/backend/emails

RUN echo "Copying frontend files..."
COPY ./packages/frontend/package.json ./packages/frontend/package.json
COPY ./packages/frontend/tsconfig.json ./packages/frontend/tsconfig.json
COPY ./packages/frontend/src ./packages/frontend/src

RUN echo "Copying commonlogic files..."
COPY ./packages/commonlogic/package.json ./packages/commonlogic/package.json
COPY ./packages/commonlogic/tsconfig.json ./packages/commonlogic/tsconfig.json
COPY ./packages/commonlogic/src ./packages/commonlogic/src

RUN echo "Copying commontypes files..."
COPY ./packages/commontypes/package.json ./packages/commontypes/package.json
COPY ./packages/commontypes/tsconfig.json ./packages/commontypes/tsconfig.json
COPY ./packages/commontypes/src ./packages/commontypes/src

RUN echo "Copying communication files..."
COPY ./packages/communication/package.json ./packages/communication/package.json
COPY ./packages/communication/tsconfig.json ./packages/communication/tsconfig.json
COPY ./packages/communication/src ./packages/communication/src

# run npm install in the WD
RUN echo "Yarn installing deps..."
RUN yarn --no-lockfile --force

# build backend
RUN echo "Running Yarn build backend script..."
RUN yarn buildback

# expose port 5000
EXPOSE 5000

# start container 
CMD node --es-module-specifier-resolution=node ./packages/backend/build/server.js
