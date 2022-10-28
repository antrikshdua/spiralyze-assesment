# Spiralyze-Assesment

## Manual Installation

Clone the repo:

```bash
git clone https://github.com/antrikshdua/spiralyze-assesment.git

```

Install the dependencies:

```bash
npm install
```


```bash
nodemon src/boot.js
```


Set the environment variables:

```bash
cp .env.dist .env

# open .env and modify the environment variables (if needed)
```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Making Changes](#making-changes)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [Custom Mongoose Plugins](#custom-mongoose-plugins)
  - [To JSON Plugin](#tojson)
  - [Paginate Plugin](#paginate)
- [License](#license)

### API Endpoints

List of available routes:

**Product routes**:\
`GET /api/v1/docs` - swagger-docs\
`POST /api/v1/listProducts` - list all available products
`POST /api/v1/createProduct` - create product 
`POST /api/v1/updateProduct` - udpate product details
`POST /api/v1/deleteProduct` - delete product

### API SPEC
```bash
 Spiralyze.postman_collection.json
```


## Features

- **Static Typing**: [TypeScript](https://www.typescriptlang.org/) static typing using typescript
- **Hot Reloading**: [Concurrently](https://github.com/open-cli-tools/concurrently) Hot realoding with concurrently
- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Error handling**: centralized error handling mechanism
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
- **Docker support**
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- **Editor config**: consistent editor configuration using [EditorConfig](https://editorconfig.org)
- **Changelog Generation**: with [Standard Version](https://github.com/conventional-changelog/standard-version)
- **Structured Commit Messages**: with [Commitizen](https://github.com/commitizen/cz-cli)
- **Commit Linting**: with [CommitLint](https://github.com/conventional-changelog/commitlint)

## Commands

Running locally:

```bash
npm start or nodemon src/boot.js
```


Docker:

```bash
# Build docker container in development mode
docker-compose -f local.yml build

# Run docker container in production mode
docker-compose -f local.yml up

# run all tests in a docker container
yarn docker:test
```



## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
NODE_ENV=XX
PORT=XX
#Mongo Db connection string
MONGO_URL=XX
REDIS_PREFIX=XX
USERS_TABLE_NAME=XX
#Redis connection string
REDIS_HOST=XX
REDIS_PORT=XX
REDIS_PASSWORD=XX
REDIS_MODE=XX
#Redis Pub/Sub env variables
REDIS_PUBLISHER_CHANNEL=XX
REDIS_SUBSCRIBER_CHANNEL=XX
TABLE_NAME=XX
#Auth eNVS
JWT_SECRET=XX
CRYPTO_ENABLE=XX
CRYPTO_KEY=XX
HTTP_LOG_LEVEL=XX
APP_LOG_LEVEL=XX
ROBOT_ENABLED=XX
PRODUCT_DETAILS_TABLE_NAME=xx
PRODUCT_DELETE_LOG_TABLE_NAME=xx

## Project Structure

```
.
├── src                             
│   ├── domain                       
      ├── Product                    
│   ├── infra                        
      ├── cryptography                        # Cryptography Layer
      ├── db                        # Databse Layer
      ├── jwt                        # JWT Layer
      ├── logger                        # Logger Layer
      ├── swagger                        # Swagger Layer

│   ├── interfaces                        # Environment 


## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/api/v1/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.


## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.

```javascript
const catchAsync = require('../utils/catchAsync');

const controller = catchAsync(async (req, res) => {
  // this error will be forwarded to the error handling middleware
  throw new Error('Something wrong happened');
});
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

The app has a utility ApiError class to which you can attach a response code and a message, and then throw it from anywhere (catchAsync will catch it).

For example, if you are trying to get a user from the DB who is not found, and you want to send a 404 error, the code should look something like:

```javascript
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

const getUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
};
```

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

```javascript
const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/users', validate(userValidation.createUser), userController.createUser);
```

## Logging

Import the logger from `src/config/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```javascript
const logger = require('<path to src>/config/logger');

logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```

In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `info`, `warn`, and `error` logs will be printed to the console.\
It is up to the server (or process manager) to actually read them from the console and store them in log files.\
This app uses pm2 in production mode, which is already configured to store the logs in log files.

Note: API request information (request url, response code, timestamp, etc.) are also automatically logged (using [morgan](https://github.com/expressjs/morgan)).

## Custom Mongoose Plugins

The app also contains 2 custom mongoose plugins that you can attach to any mongoose model schema. You can find the plugins in `src/models/plugins`.

```javascript
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    /* schema definition here */
  },
  { timestamps: true }
);

productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const ProductSchema = mongoose.model('User', productSchema);
```

### toJSON

The toJSON plugin applies the following changes in the toJSON transform call:

- removes \_\_v, createdAt, updatedAt, and any schema path that has private: true
- replaces \_id with id

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications. It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.

To maintain a consistent coding style across different IDEs, the project contains `.editorconfig`

## License

[MIT](LICENSE)
