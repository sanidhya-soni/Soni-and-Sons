# Stage 1: Build the Angular application
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@9.7.2
RUN npm install -g @angular/cli
RUN npm install --legacy-peer-deps

COPY . .

RUN ng build

CMD ["npx", "http-server", "dist/webapp"]
