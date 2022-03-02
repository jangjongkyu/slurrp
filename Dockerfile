FROM node:14.17.0

# Create app directory
WORKDIR /app
ADD . /app/

# global install & update
RUN npm i -g npm
RUN npm install

RUN rm package-lock.json
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD ["npm", "run", "start"]
