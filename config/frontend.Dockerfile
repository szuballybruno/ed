
#
# CONTAINER #1 ----- BUILDER 
# task: build react app
#
FROM node:18.12.1 as builder
WORKDIR /app

# copy package.json
RUN echo "Copying package.json files..."
COPY ./package.json ./package.json
COPY ./packages/frontend/package.json ./packages/frontend/package.json
COPY ./packages/commonlogic/package.json ./packages/commonlogic/package.json
COPY ./packages/commontypes/package.json ./packages/commontypes/package.json
COPY ./packages/communication/package.json ./packages/communication/package.json
COPY ./packages/x-core/package.json ./packages/x-core/package.json

# yarn install
RUN echo "Yarn installing deps..."
RUN yarn

# copy
RUN echo "Copying files..."
COPY ./tsconfig.json ./tsconfig.json
COPY ./lerna.json ./lerna.json

COPY ./packages/frontend/tsconfig.json ./packages/frontend/tsconfig.json
COPY ./packages/frontend/config-overrides.js ./packages/frontend/config-overrides.js
COPY ./packages/frontend/.env ./packages/frontend/.env
COPY ./packages/frontend/.eslintrc.json ./packages/frontend/.eslintrc.json
COPY ./packages/frontend/src ./packages/frontend/src
COPY ./packages/frontend/public ./packages/frontend/public
COPY ./packages/frontend/index.html ./packages/frontend/index.html
COPY ./packages/frontend/vite.config.ts ./packages/frontend/vite.config.ts

COPY ./packages/commonlogic/tsconfig.json ./packages/commonlogic/tsconfig.json
COPY ./packages/commonlogic/src ./packages/commonlogic/src

COPY ./packages/commontypes/tsconfig.json ./packages/commontypes/tsconfig.json
COPY ./packages/commontypes/src ./packages/commontypes/src

COPY ./packages/communication/tsconfig.json ./packages/communication/tsconfig.json
COPY ./packages/communication/src ./packages/communication/src
COPY ./packages/communication/rollup.config.js ./packages/communication/rollup.config.js

COPY ./packages/x-core/tsconfig.json ./packages/x-core/tsconfig.json
COPY ./packages/x-core/src ./packages/x-core/src

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
