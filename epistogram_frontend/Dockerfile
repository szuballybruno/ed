FROM node:latest as builder
WORKDIR /app

COPY package.json .
COPY .env ./.env

RUN yarn

COPY /src ./src
COPY /public ./public
COPY tsconfig.json .

RUN yarn build

# build final Nginx image
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g daemon off;"]
