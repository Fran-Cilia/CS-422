# Setup Instructions

#

## 1. Setting up Node.js

### --- DO NOT PROCEED TO OTHER SECTIONS WITHOUT SETTING UP NODE.JS ---

#

Setting up the server and client will require that you have Node.js installed

1. Install Node.js from here: https://nodejs.org/en/download **DOWNLOAD NODE v20.12.2(LTS)**
2. Open your downloads folder and find the node-v20.12.2.pkg file.
3. Execute (double click) the node-v20.12.2.pkg file and follow the steps in the guided installer
4. After completing the installation check you can access node in your terminal by running the following command:

```console
foo@bar:~$ node --version
v20.12.2
```

### --- DO NOT BEGIN SERVER, CLIENT, OR DATABASE WITHOUT SETTING UP NODE.JS ---

#

## 2. Setting up Database

For the database we are using a sqlite database

1. cd into ./server (**RUN COMMAND FROM PROJECT ROOT**)

```console
foo@bar:~$ cd server
```

2. Install dependencies

```console
foo@bar:~$ npm install
```

3. Generate the schema

```console
foo@bar:~$ npm run schema-generate
```

4. Push the schema to the database

```console
foo@bar:~$ npm run schema-push
```

5. Initialize the DB with default data

```console
foo@bar:~$ npm run init-db
```

## 3. Setting up Server

The code for the server can be found in the server directory. We are using express.js with typescript.

**COMPLETE DATABASE SETUP BEFORE PROCEEDING**

**STEPS ONE AND TWO CAN BE IGNORED IF DATABASE SETUP IS COMPLETED**

#

1. cd into ./server (**RUN COMMAND FROM PROJECT ROOT**)

```console
foo@bar:~$ cd server
```

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

## --- OPEN A NEW TERMINAL WINDOW BEFORE PROCEEDING. ---

## CLIENT AND SERVER MUST BE RUNNING AT THE SAME TIME.

## 4. Setting up Client

The code for the client can be found in the client directory. Using React.js with Vite as the react framework and typescript.

1. cd into ./client (**RUN COMMAND FROM PROJECT ROOT**)

```console
foo@bar:~$ cd client
```

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

4. Open **<http://localhost:5173/login>** in your browser.

You should be presented with a login screen with three users to select from.
