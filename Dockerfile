FROM node:16.20.0-bullseye-slim as base

ENV PATH=${PATH}

WORKDIR /src
COPY . /

RUN npm install serve
RUN npm install

EXPOSE 8088

FROM base as production
ENV NODE_ENV=production
CMD ["npm", "start"]

FROM base as dev
ENV NODE_ENV=development
CMD ["npm", "start"]
