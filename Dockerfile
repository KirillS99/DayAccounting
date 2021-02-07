FROM node:12

WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run build

EXPOSE $PORT
CMD ["npm", "run", "start:prod"]