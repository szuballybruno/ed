
#
# CONTAINER #1 ----- BUILDER 
# task: build react app
#
FROM node:18.12.1 as builder
WORKDIR /app

# copy package.json
RUN echo "Copying root package.json..."
COPY ./package.json ./package.json

RUN echo "Copying frontend package.json..."
COPY ./packages/frontend/package.json ./packages/frontend/package.json

RUN echo "Copying commonlogic package.json..."
COPY ./packages/commonlogic/package.json ./packages/commonlogic/package.json

RUN echo "Copying commontypes package.json..."
COPY ./packages/commontypes/package.json ./packages/commontypes/package.json

RUN echo "Copying communication package.json..."
COPY ./packages/communication/package.json ./packages/communication/package.json
COPY ./packages/communication/rollup.config.js ./packages/communication/rollup.config.js

RUN echo "Copying xcore package.json..."
COPY ./packages/xcore/package.json ./packages/xcore/package.json

# yarn install (no-lockfile)
RUN echo "Yarn installing deps..."
RUN yarn --no-lockfile

# copy
RUN echo "Copying root files..."
COPY ./tsconfig.json ./tsconfig.json
COPY ./lerna.json ./lerna.json

RUN echo "Copying frontend files..."
COPY ./packages/frontend/tsconfig.json ./packages/frontend/tsconfig.json
COPY ./packages/frontend/config-overrides.js ./packages/frontend/config-overrides.js
COPY ./packages/frontend/.env ./packages/frontend/.env
COPY ./packages/frontend/.eslintrc.json ./packages/frontend/.eslintrc.json
COPY ./packages/frontend/src ./packages/frontend/src
COPY ./packages/frontend/public ./packages/frontend/public
COPY ./packages/frontend/index.html ./packages/frontend/index.html
COPY ./packages/frontend/vite.config.ts ./packages/frontend/vite.config.ts

RUN echo "Copying commonlogic files..."
COPY ./packages/commonlogic/tsconfig.json ./packages/commonlogic/tsconfig.json
COPY ./packages/commonlogic/src ./packages/commonlogic/src

RUN echo "Copying commontypes files..."
COPY ./packages/commontypes/tsconfig.json ./packages/commontypes/tsconfig.json
COPY ./packages/commontypes/src ./packages/commontypes/src

RUN echo "Copying communication files..."
COPY ./packages/communication/tsconfig.json ./packages/communication/tsconfig.json
COPY ./packages/communication/src ./packages/communication/src

RUN echo "Copying xcore files..."
COPY ./packages/xcore/tsconfig.json ./packages/xcore/tsconfig.json
COPY ./packages/xcore/src ./packages/xcore/src

# build frontend
RUN echo "Running Yarn build frontend script..."
RUN yarn build-client

#
# CONTAINER #2 ----- RUNNER 
# task: build final Nginx image
#
FROM nginx:alpine

COPY --from=builder /app/packages/frontend/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY ./packages/frontend/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g daemon off;"]
