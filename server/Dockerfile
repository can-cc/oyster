FROM node:8.9

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir /db
RUN mkdir /log
RUN mkdir /config

WORKDIR /app

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]

