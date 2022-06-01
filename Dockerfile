FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install pm2 -g
RUN npm install
#RUN npx tsc

COPY . .

EXPOSE 8080

CMD ["pm2-runtime", "lib/index.js"]