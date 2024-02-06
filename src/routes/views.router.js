const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/fs/product-manager.js");
const manager = new ProductManager("./src/models/products.json");

router.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts();
    console.log(products);
    res.render("home", { products });
  } catch (err) {
    res.status(500).render("error", { error: "Error al obtener productos" });
  }
});

router.get("/realTimeProducts", async (req, res) => {
  try {
    res.render("realTimeProducts");
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

module.exports = router;
