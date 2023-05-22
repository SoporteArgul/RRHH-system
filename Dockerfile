FROM node:16-alpine

RUN npm install -g ts-node
RUN npm install pm2 -g
WORKDIR /usr/src/app
COPY package.json ./
COPY . . 
RUN npm install 
ENV NODE_ENV=production

# ENV PM2_PUBLIC_KEY zyfyvt4nsg9iigv
# ENV PM2_SECRET_KEY oon0m8oy0k50daw



EXPOSE 5005
CMD ["npm","start","app.ts"]


