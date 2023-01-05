#
# builder
#
FROM localhost:5000/monosrc:latest as builder
WORKDIR /app

# build
RUN yarn build-server

# #
# # runner
# #
# FROM node:18.12-slim as runner
# WORKDIR /app

# COPY --from=builder /app/lerna.json .
# COPY --from=builder /app/tsconfig.json .
# COPY --from=builder /app/package.json .
# COPY --from=builder /app/packages ./packages
# COPY --from=builder /app/thinkhub-xlib/tsconfig.json ./thinkhub-xlib/tsconfig.json
# COPY --from=builder /app/thinkhub-xlib/packages ./thinkhub-xlib/packages

# expose port 5000
EXPOSE 5000

# start container
CMD yarn start-server-dist
