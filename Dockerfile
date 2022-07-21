FROM node:16

WORKDIR /usr/src/app

COPY package*.json .

RUN npm i @babel/cli @babel/core nodemon sequelize-cli -g

RUN npm i

COPY . .

RUN babel src -d lib

CMD CHOKIDAR_USEPOLLING=true babel src -d lib --watch & nodemon lib/app.js
