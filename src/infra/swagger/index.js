/**
 * Swagger Integration
 */
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "spiralyze-assesment",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Antriksh Dua",
          url: "https://github.com/antrikshdua",
          email: "dua.antriksh@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000/api/v1",
        },
      ],
    },
    apis: ['/src/interfaces/api/routes/v1.routes.js']
  };

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec
}
 