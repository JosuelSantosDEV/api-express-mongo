FROM node:18.20.4-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3333

CMD [ "npm", "run", "dev" ]