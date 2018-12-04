FROM node:8.9-alpine

ENV PATH /usr/local/bin:$PATH

COPY package.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN npm i && mkdir /app && cp -R ./node_modules ./app

RUN mkdir /db
RUN mkdir /log

WORKDIR /app

COPY . .

RUN npm run build
