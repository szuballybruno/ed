# Get the latest node image 
FROM node:latest

# set the working directory, in which every command will run
WORKDIR /app

# copy package.json from project root to the wd root in the container 
COPY package.json .

# run npm install in the WD
RUN npm install

# copy application source files from the project root to the WD
COPY /api ./api
COPY /models ./models
COPY /services ./services
COPY /utilities ./utilities

COPY database.ts .
COPY server.ts .
COPY staticProvider.ts .

COPY tsconfig.json .

# compile TypeScript to /build folder
RUN npm run build

# set /build as the WD
WORKDIR /app/build

# copy runtime misc dependnecy files
COPY config.env ./config.env
COPY epistogram_service_user_key.json .
COPY /emails ./emails
COPY /sql ./sql

# expose port 5000
EXPOSE 5000

# start container 
CMD node server.js
