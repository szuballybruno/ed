ARG ENVIRONMENT_NAME=unknown

#
# copy_deps 
#
FROM node:18.12.1 AS copy_deps
WORKDIR /app

# copy packages
COPY ./package.json .
COPY ./packages ./packages
COPY ./xlib/package.json .
COPY ./xlib/packages ./xlib/packages

# delete everything but package.json files
RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

#
# builder
#
FROM node:18.12.1 as builder
ARG ENVIRONMENT_NAME
WORKDIR /app
COPY --from=copy_deps /app .

# setup lerna 
COPY ./lerna.json .
RUN yarn global add lerna

# bootstrap
RUN npx lerna bootstrap --scope=@episto/frontend

# copy files for build 
COPY ./xlib/tsconfig.json ./xlib/tsconfig.json
COPY ./xlib/packages ./xlib/packages
COPY ./tsconfig.json ./tsconfig.json
COPY ./packages ./packages

# set env name
RUN node ./packages/frontend/setenv.js ${ENVIRONMENT_NAME}

# build
RUN yarn build-client 

#
# CONTAINER #2 ----- RUNNER 
# task: build final Nginx image
#
FROM nginx:alpine AS runner

COPY --from=builder /app/packages/frontend/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY ./packages/frontend/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g daemon off;"]
