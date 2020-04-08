# CI

[![Build Status](https://travis-ci.com/hoanglinhtan/ExpressMongoBoilerplate.svg?branch=master)](https://travis-ci.com/hoanglinhtan/ExpressMongoBoilerplate)

# Express 4x

ExpressJS CRUD boilerplate with Mongoose for scalable projects.

### Includes

-   [ExpressJS](https://expressjs.com)
-   [NodeJS](https://nodejs.org/en/)
-   [Mongoose](http://mongoosejs.com/docs/guide.html)
-   [Nodemon](https://nodemon.io/)

### Prerequisites

-   Express 4+
-   MongoDB 4+

### Installing

```bash
#!/bin/bash
$ git clone https://github.com/hoanglinhtan/ExpressMongoBoilerPlate
$ cd ExpressMongoBoilerPlate
```

### Useful Scripts

| Script      | Description                                 |
| ----------- | ------------------------------------------- |
| yarn start  | Starts development server at localhost:3333 |
| yarn format | Run format through prettier                 |
| yarn debug  | Debug express app                           |

### Start Server

```bash
yarn install
nano .env
NODE_ENV=development
PORT=3001
cp ./server/config/auth-config.json.example ./server/config/auth-config.json
cp ./server/config/database-config.json.example ./server/config/database-config.json
cp ./server/config/jwt.key.example ./server/config/jwt.key
cp ./server/config/logger-config.json.example ./server/config/logger-config.json
cp ./server/config/white-list.json.example ./server/config/white-list.json
cp .env.example .env

yarn start
```

## [Issues](https://github.com/hoanglinhtan/ExpressMongoBoilerPlate/issues)
