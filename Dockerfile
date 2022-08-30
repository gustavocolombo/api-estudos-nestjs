FROM node:lts-alpine

WORKDIR /home/node/api

COPY package.json .

RUN npm install --location=global ts-node-dev
RUN npm install --location=global npm@8.3.1
RUN npx prisma generate 

COPY . . 

EXPOSE 3000

CMD ["npm", "start"]