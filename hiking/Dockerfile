FROM node:14-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install --production

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
