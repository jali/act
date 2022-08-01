FROM node:14.17.6

WORKDIR /usr/src/app

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# bundle app source
COPY . .

EXPOSE 8081
ENTRYPOINT ["/usr/src/app/node_modules/.bin/nodemon"]
