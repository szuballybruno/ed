FROM monodeps:latest
WORKDIR /app

# copy files for build  
COPY ./epistogram/lerna.json ./lerna.json
COPY ./epistogram/tsconfig.json ./tsconfig.json
COPY ./epistogram/packages ./packages
COPY ./thinkhub-xlib/lerna.json ./thinkhub-xlib/lerna.json
COPY ./thinkhub-xlib/tsconfig.json ./thinkhub-xlib/tsconfig.json
COPY ./thinkhub-xlib/packages ./thinkhub-xlib/packages