# build stage
FROM node:18.14-alpine as build

# set working directory
WORKDIR /app

# add 'node_modules/.bin to $PATH'
ENV PATH /app/node_modules/.bin$PATH

# copy relevant files
COPY app/package.json ./
COPY app/package-lock.json ./
COPY app/public/ ./public
COPY app/src/ ./src

# install dependencies
RUN npm install
RUN npm install axios
RUN npm install react-router-dom

# build the project
RUN npm run build

# production environment
FROM nginx:alpine AS prod

# set working directory
WORKDIR /usr/share/nginx/html

# copy files from previous stage
COPY --from=build /app/build .

# expose port
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
