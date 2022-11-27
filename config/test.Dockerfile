FROM alpine:3.14

# set the working directory, in which every command will run
WORKDIR /app

# copy package json files
RUN echo "Copying root package.json..."
COPY ./package.json ./package.json
