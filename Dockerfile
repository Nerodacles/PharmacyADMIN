FROM node:16.17.0-bullseye-slim as base

ENV PATH=${PATH}

WORKDIR /src
COPY package*.json /

RUN npm install serve

EXPOSE 8088

FROM base as production
ENV NODE_ENV=production
RUN npm install
COPY . /^
RUN npm run build
CMD ["npm", "serve"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY . /
RUN npm run build
