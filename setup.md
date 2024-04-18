# Setup Instructions

## Database

For the database we are using a mysql docker container this will make setup a lot easier.

1. Install docker desktop: https://docs.docker.com/engine/install/
2. Make sure you have the docker cli setup, docker desktop should have automatically done this. To verify the cli see below

```console
foo@bar:~$ docker --version
Docker version 20.10.17, build 100c70180f
```

3. To build the database container, first make sure you are in the root of the project, then run the command below:

```console
foo@bar:~$ docker compose build
```

4. To run the database container:

```console
foo@bar:~$ docker compose up
```

5. You can stop the container with ^C

## Setting up Node

Setting up the server and client will require that you have Node.js installed

1. Install Node.js from here: https://nodejs.org/en/download **DOWNLOAD NODE 18 OR HIGHER\_**
2. Check you have node installed:

```console
foo@bar:~$ node --version
v21.5.0
```

## Server

The code for the server can be found in the server directory. We are using express.js with typescript.

1. cd into ./server
2. Install dependencies

```console
foo@bar:~$ npm install
```

3. Run the server:

```console
foo@bar:~$ npm run dev

> server@1.0.0 dev
> nodemon

[nodemon] 3.1.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src/**/*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node ./src/index.ts`
Server is running on http://localhost:3000
```

4. Open http://localhost:3000 in your browser and you should see the message: "Hello World from Express 1"

## Client

The code for the client can be found in the client directory. Using React.js with Vite as the react framework and typescript.

1. cd into ./client
2. Install dependencies

```console
foo@bar:~$ npm install
```

3. Run the client:

```console
foo@bar:~$ npm run dev

> client@0.0.0 dev
> vite


  VITE v5.2.9  ready in 327 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

4. Open http://localhost:5173/

You will see a barebones screen with an empty list of users. Type a name into the text box and hit enter. You should see the name appear in the list of users. If you look at the code in ./client/src/App.tsx you can see that the client is fetching the users through the api route /getUsers and creating users through the api route /createUser.
