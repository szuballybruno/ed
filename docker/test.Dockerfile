FROM node:18.12.1-slim as test-1
WORKDIR /app

# copy epistogram
COPY ./epistogram ./