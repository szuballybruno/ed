# Get the latest node image 
FROM node:latest

# set the working directory, in which every command will run
WORKDIR /app

# copy package.json from project root to the wd root in the container 
COPY package.json .
COPY .env ./.env

# install YARN cause' fuck NPM
# RUN npm install --global yarn

# run npm install in the WD
RUN yarn

# copy application source files from the project root to the WD
COPY /src ./src
COPY /public ./public

COPY tsconfig.json .

# compile TypeScript to /build folder
RUN yarn build

# set /build as the WD
WORKDIR /app/build

# expose port 
EXPOSE 3000

RUN npm install --global http-server

RUN echo asdaasdasd

# start container 
CMD ["http-server", "-p 3000 --proxy"]
