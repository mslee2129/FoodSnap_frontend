# pull official base image
FROM node:18.14-alpine

# set working directory
WORKDIR /app

# add 'node_modules/.bin to $PATH'
ENV PATH /app/node_modules/.bin$PATH

COPY app/package.json ./
COPY app/package-lock.json ./
COPY app/public/ ./public
COPY app/src/ ./src

RUN npm install
RUN npm install axios
RUN npm install react-router-dom

EXPOSE 3000

CMD ["npm", "start"]
