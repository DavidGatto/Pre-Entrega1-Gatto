const express = require("express");
const router = express.Router();

const ViewsController = require("../controllers/viewsController.js");
const viewsController = new ViewsController();

router.get("/register", viewsController.register);

router.get("/", viewsController.login);

router.get("/api/products", viewsController.getProducts);

router.get("/products/:prodId", viewsController.getProductById);

router.get("/api/carts/:cid", viewsController.getCartById);

module.exports = router;
