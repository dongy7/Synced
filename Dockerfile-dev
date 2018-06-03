FROM node:9

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN yarn install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3001
CMD [ "npm", "run", "dev" ]