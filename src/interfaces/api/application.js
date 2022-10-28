"use strict";

/**
 * Import module
 */
const express = require("express");
const http = require("http");
const cors = require("cors");
const {
  errorMiddleware,
  notfoundMiddleware,
  apiResponseMiddleware,
  apiLoggerMiddleware,
} = require("../../../src/interfaces/api/middleware");
const { v1Router } = require("../../../src/interfaces/api/routes");
const { appLogger } = require("../../../src/infra/logger");

const { swaggerUi, swaggerSpec } = require("../../../src/infra/swagger");

v1Router.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

const prefixRoute = "/api/v1";

/**
 * Export node server start function
 * @returns
 */
exports.startNodeServer = async () => {
  const app = new express();

  /**
   * Set app middleware
   */
  app
    .use(apiResponseMiddleware)
    .use(cors())
    .use(express.json())
    .use(
      express.urlencoded({
        extended: true,
      })
    )
    .use(apiLoggerMiddleware())
    .use(prefixRoute, v1Router)
    .use(notfoundMiddleware)
    .use(errorMiddleware);

  const server = http.createServer(app);

  /**
   * Mongodb connection initiate
   */
  require("../../../src/infra/db/mongoose");

  /**
   * Redis connection initiate
   */
  // require('../../../src/infra/db/redis');

  server.on("close", () => {
    appLogger.error("Server close");
  });

  return server;
};
