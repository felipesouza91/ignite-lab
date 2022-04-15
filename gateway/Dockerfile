FROM node:14.18-alpine
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . .
EXPOSE 3332
CMD [ "npm", "start" ]