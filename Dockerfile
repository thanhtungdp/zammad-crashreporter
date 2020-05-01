FROM node:12-alpine3.11

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY config.sample.js ./config.js
COPY . .

EXPOSE 3001

CMD ["npm", "start"]