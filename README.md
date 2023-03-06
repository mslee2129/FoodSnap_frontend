# Image recognition-based calorie tracker

## Description

Imagine that you could show a dish to a machine learning algorithm and it would come back to you with the number of calories that it contained? In this project we have developed an image recognition-based calorie tracker.

This project contains the react front-end for the FoodSnap application.

## Set up

Install `npm` after cloning the repository:
```
npm ci
```

Install `axios`:
```
npm install axios
```

Install `react-router-dom`:
```
npm install react-router-dom
```

Start server:
```
npm start
```

### Run using Docker

You can avoid installing the required packages locally by using `Docker` instead. Once you've installed `Docker` on your machine, execute the following steps to build an image defined by [`Dockerfile.dev`](Dockerfile.dev) and start the container.

Build the image:
```
docker build -f Dockerfile.dev -t fsnap-frontend-dev .
```

Run the container on port 3000:
```
docker run -p 3000:3000 fsnap-frontend-dev
```

You should now be able to see the website at `http://127.0.0.1:3000/`.