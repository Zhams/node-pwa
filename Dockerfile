FROM node:22-alpine

#RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# RUN apk update && apk upgrade
# RUN apk add python

COPY package*.json ./

RUN apk add tzdata
#RUN npm i -g node-gyp
RUN npm i

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
