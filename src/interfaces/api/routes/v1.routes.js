// 'use strict's;

/**
 * Import module
 */
const { Router } = require("express");
/**
 * Import controllers
 */
const {
  productController,
} = require("../../../../src/interfaces/api/controllers");
/**
 * Import middleware
 */
const {
  apiAuthMiddleware,
  joiValidatorMiddleware,
} = require("../../../../src/interfaces/api/middleware");

const v1Router = new Router();

// /**
//  * Auth middleware
//  */
// v1Router.use(apiAuthMiddleware);

/**
 * Get List of Products
 */
v1Router.get("/listProducts", productController.listProducts);

/**
 * Create new product
 */
v1Router.post(
  "/createProduct",
  joiValidatorMiddleware("productCreateSchema"),
  productController.createProduct
);

/**
 * Update existing product
 */
v1Router.post(
  "/updateProduct",
  joiValidatorMiddleware("productUpdateSchema"),
  productController.updateProduct
);

/**
 * Delete product
 */
v1Router.delete("/deleteProduct/:productId", productController.deleteProduct);

module.exports = v1Router;
