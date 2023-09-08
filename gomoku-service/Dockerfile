FROM node:16-alpine

WORKDIR /gomoku-service

ADD ./package.json ./
ADD ./package-lock.json ./
ADD ./tsconfig.json ./
ADD ./.env ./

# RUN npm --ignore-scripts 
RUN npm i

CMD npm run bootstrapdb; npm run dev