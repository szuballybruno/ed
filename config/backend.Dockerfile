# Get the latest node image 
FROM node:18.7.0

# set the working directory, in which every command will run
WORKDIR /app

# copy
COPY ./package.json .

COPY ./packages/backend/package.json .
COPY ./packages/backend/tsconfig.json .
COPY ./packages/backend/src .
COPY ./packages/backend/config .
COPY ./packages/backend/emails .

COPY ./packages/commonlogic/package.json .
COPY ./packages/commonlogic/tsconfig.json .
COPY ./packages/commonlogic/src .

COPY ./packages/commontypes/package.json .
COPY ./packages/commontypes/tsconfig.json .
COPY ./packages/commontypes/src .

COPY ./packages/communication/package.json .
COPY ./packages/communication/tsconfig.json .
COPY ./packages/communication/src .

# run npm install in the WD
RUN npx yarn --no-lockfile --force

# build backend
RUN npx yarn buildback

# expose port 5000
EXPOSE 5000

# start container 
CMD node --es-module-specifier-resolution=node ./packages/backend/build/server.js
