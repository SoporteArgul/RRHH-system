FROM node:18-alpine

RUN npm install -g ts-node
WORKDIR /usr/src/app
COPY package.json ./
COPY . . 
RUN npm install 
ENV NODE_ENV=production
EXPOSE 5005
CMD ["npm","run","start:prod"]


