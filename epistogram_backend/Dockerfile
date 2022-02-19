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
COPY config.env .

# compile TypeScript to /build folder
RUN npm run build

# set /build as the WD
WORKDIR /app/build

# expose port 5000
EXPOSE 5000

# start container 
CMD node src/server.js
