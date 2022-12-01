FROM cypress/base:18.12.1

WORKDIR /app

RUN echo "Copying config files before install..."
COPY ./package.json ./package.json
COPY ./lerna.json ./lerna.json
COPY ./packages/tests-client/package.json ./packages/tests-client/package.json

RUN echo "Installing deps..."
RUN yarn --immutable --immutable-cache --check-cache

RUN echo "Copying files..."
COPY ./tsconfig.json ./tsconfig.json
COPY ./packages/tests-client/tsconfig.json ./packages/tests-client/tsconfig.json
COPY ./packages/tests-client/cypress ./packages/tests-client/cypress
COPY ./packages/tests-client/cypress.config.ts ./packages/tests-client/cypress.config.ts

RUN echo "Building tests-client..."
RUN yarn lerna run build --scope=@episto/tests-client --include-dependencies

CMD yarn lerna run start-cy --scope=@episto/tests-client --include-dependencies
