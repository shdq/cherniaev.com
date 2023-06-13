---
title: "Minimize Container Image Size for Frontend Apps with Multi-Stage Builds in Docker"
date: "2023-06-13"
excerpt: "Learn how to reduce your frontend app's container image size by over 30 times using multi-stage builds and Nginx"
image: "https://github-production-user-asset-6210df.s3.amazonaws.com/1219618/244089041-2e3b4ece-a886-4ee7-93ae-796cb621fd07.jpg"
tags: ["frontend", "docker", "nginx"]
---

![Containers](https://github-production-user-asset-6210df.s3.amazonaws.com/1219618/244089041-2e3b4ece-a886-4ee7-93ae-796cb621fd07.jpg "Shipping containers")

_<small>Photo by Paul Teysen on [Unsplash](https://unsplash.com/photos/bukjsECgmeU)</small>_

While developing an authentication microservice that required a separate container for frontend, I noticed the significant file sizes of Ubuntu-based images that many developers tend to use for containerizing their applications. As a result, many of the images are **more than 1GB** in size. This observation sparked my curiosity and led me to investigate methods to decrease the image size specifically for a frontend application. I want to share my findings in this article.

## TL;DR

To minimize container image with your frontend app, use [multi-stage builds](https://docs.docker.com/build/building/multi-stage/) in Docker and serve only production build with [Nginx](https://hub.docker.com/_/nginx/).

With these optimizations, the size of the resulting image with a frontend app scaffolded using `vite` became **more than 30 times less!**

Keep reading if you're interested in why and how.

## Benefits of optimizing the size of container images

There are three main points on the surface:

- **Reduced storage usage and costs:** This is significant when you have many containers running concurrently or when deploying containers in resource-constrained environments.
- **Faster deployment and scaling:** This is important in scenarios where you must deploy multiple instances of the same container, such as in a microservices architecture or when scaling up your application.
- **Improved bandwidth usage:** This is useful in scenarios with limited bandwidth or when deploying containers across multiple regions or data centers.

It seems like it worth the effort, so let's create a frontend app and containerize it, trying to minimize the size of an image as much as possible.

## Step one: Creating a frontend app

### Scaffold a Vite project

To keep things simple, let's create a Vite project without any logic using the following `npm` command:

```bash
npm create vite@latest frontend-vite -- --template react-ts
```

Since I prefer React and TypeScript, I specified the `react-ts` template and named the project `frontend-vite`. However, feel free to choose a different name or stack according to your preferences.

### Configuring the app for Docker

To ensure your app will run in a Docker container, we need to modify the Vite configuration file (`vite.config.ts`) to specify the desired port that will be used later inside a container. Let's use port `3333` for the test app:

```typescript
export default defineConfig({
  plugins: [react()],
  // add the section below
  server: {
    host: true,
    port: 3333,
  },
});
```

### Run the app

Let's run the app with the following command and look at it:

```bash
npm run dev
```

Open [http://localhost:3333/](http://localhost:3333/) in you browser and check that our app is running and showing you a welcome page.

To stop Vite server, press `q` or `CTRL+C`.

That's it! We are ready to create a Docker image with our frontend app.

## Step two: Building Docker image

### Writing a Dockerfile

A [Dockerfile](https://docs.docker.com/engine/reference/builder/) is a text document that contains all the commands a user could call on the command line to assemble an image.

We will use a base image with the LTS version of Node.js for our frontend app to install dependencies and run the Vite server inside the container.

Ok, let's create it. In the root directory of our project, add a file with the name `Dockerfile` and the following lines:

```dockerfile
FROM node:lts

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
```

Make sure the exposed port is the same as specified in the frontend app config.

### Building and running

Type the following command in your terminal to build an image and run it:

```bash
docker build -t frontend-vite .
```

`-t` option in `docker build` lets us specify a tag for our image. I used `frontend-vite` as a tag for the image.

```bash
docker run --rm -it -p 3333:3333/tcp frontend-vite
```

Options used with `docker run` command are `--rm` to clean up volumes, `-it` for interactive mode with a virtual terminal to monitor app output, and `-p` to assign a specific port for our app. Check [docker run docs](https://docs.docker.com/engine/reference/run/) for details.

Check that our app is successfully running inside the container by opening [http://localhost:3333/](http://localhost:3333/) in your browser.

> If you are having trouble running your image and see a **Segmentation fault** error, look at the **Troubleshooting** section at the end of the article.

### Checking the size of the image

Let's look at the image size using this command:

```bash
docker images
```

Our `frontend-vite` image size is `1.27GB`. That's a lot, and we can reduce the size of the image.

## Step three: Optimizing Docker image

### Optimization strategy

A typical recommendation to reduce image size is to use images based on lightweight Linux distributives like [Alpine](https://www.alpinelinux.org/). This optimization could reduce the size in half. But we can do even more!

Since we only want to run our app in a container, we don't need the source code and all the developer tools, so we can bring `NGINX` as a web server to serve a production build of our frontend app.

### Updating Dockerfile

To implement the strategy described above, we will use [multi-stage builds](https://docs.docker.com/build/building/multi-stage/) in Docker to build our application in the first stage and serve its production build with `NGINX` in the second stage.

This is the updated `Dockerfile`:

```dockerfile
# Build stage

FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Serve stage

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

I used Alpine Linux as a base image for the LTS version of Node.js (`node:lts-alpine`) and NGINX (`nginx:stable-alpine`).

### Building and running

Let's build our optimized image with the following command:

```bash
docker build -t frontend-vite-optimized .
```

And run the `frontend-vite-optimized` image in Docker:

```bash
docker run --rm -it -p 3333:80/tcp frontend-vite-optimized
```

Reload the page in the browser and make sure the app is working, then look at your terminal for the `NGINX` output with the browser requests.

Terminal logs will show you lines similar to this:

```bash
172.17.0.1 - - [Day/Month/Year:Time +0000] "GET / HTTP/1.1" 200 457 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15) Gecko/20100101 Firefox/114.0" "-"
```

### Checking the size of the optimized image

Let's use the following command again:

```bash
docker images
```

The size of our `frontend-vite-optimized` image is `41.2MB`. Wow, what an improvement!

## Results

After all the optimizations, the size of the resulting image with our frontend app scaffolded using `vite` was significantly reduced from `1.27GB` to `41.2MB`.

🔥 **It is more than 30 times less!**

## Troubleshooting

### Segmentation fault running Docker container with Vite app

I run into a nasty bug on my Macbook with an Intel chip. When Docker tries to run `vite` inside a container, it gives a `Segmentation fault` error. It happens when Docker tries to execute `CMD ["npm", "run", "dev"]` or `CMD ["yarn", "run", "dev"]`

```bash
> vite

Segmentation fault
```

To fix that, I had to downgrade to [Docker Desktop 4.18.0](https://docs.docker.com/desktop/release-notes/#4180). Issue on GitHub [#6924](https://github.com/docker/for-mac/issues/6824).

## Last words

Congrats on reading to the end! Thank you for your time! Share your results with me on [twitter](https://twitter.com/shdq "@shdq"), and if you have questions, feel free to ask.
