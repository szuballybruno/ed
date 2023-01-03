#
# builder
#
FROM monosrc:latest as builder
WORKDIR /app

# build
RUN yarn build-server

# #
# # runner
# #
# FROM node:18.12-slim as runner
# WORKDIR /app
# COPY --from=builder /app /app

# expose port 5000
EXPOSE 5000

# start container
CMD yarn start-server-dist
