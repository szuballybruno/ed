ARG ENVIRONMENT_NAME=unknown

#
# builder
#
FROM monodeps:latest as builder
ARG ENVIRONMENT_NAME
WORKDIR /app

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
COPY --from=builder /app/packages/frontend/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g daemon off;"]
