# Get the latest node image 
FROM node:latest

# set the working directory, in which every command will run
WORKDIR /app

# copy package.json from project root to the wd root in the container 
COPY package.json .

# run npm install in the WD
RUN npm install

# copy files from the project root to the WD
COPY /src ./src
COPY tsconfig.json .

# compile TypeScript to /build folder
RUN tsc --

# copy runtime dependnecy files, 
# note, these are not built and copied to the /build
# folder by the compiler, since these are not source files. 
COPY config.env ./config.env
COPY /src/emails ./build/emails
COPY /src/sql ./build/sql

# expose port 5000
EXPOSE 5000

# start container 
CMD node ./build/server.js
