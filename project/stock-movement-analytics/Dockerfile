FROM node:14-slim

WORKDIR /usr/src/app

ADD node_modules node_modules
ADD src src
ADD package.json package.json
ADD wait/wait-for-it.sh wait-for-it.sh
ADD wait/wait.sh wait.sh

RUN apt-get update && apt-get install -y curl

EXPOSE 8080
CMD [ "npm", "start" ]
