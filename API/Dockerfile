FROM node:20

ARG ENV_FILE

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ${ENV_FILE} .env

EXPOSE 5001

ENV NODE_ENV production

CMD ["npm", "start"]
