const express = require("express");
const router = express.Router();

const productManager = require("../dao/db/product-manager-db.js");
const manager = new productManager();

// Ruta para obtener un producto por su id
router.get("/products/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;

    const search = await manager.getProductById(pid);

    if (search) {
      // Si se encuentra el producto lo devuelve
      return res.send(search);
    } else {
      // Si no se encuentra el producto devuelve un mensaje de error
      return res.send("No se encontró el producto");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error interno del servidor");
  }
});

// Ruta para agregar un nuevo producto
router.post("/products", async (req, res) => {
  try {
    const productReq = req.body;
    const product = await manager.addProduct(productReq);
    res
      .status(201)
      .json({ message: "Producto agregado correctamente", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un producto existente por su id
router.put("/products/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const productUpdate = await manager.updateProduct(id, req.body);
    res.status(200).json({
      message: "Producto actualizado correctamente",
      product: productUpdate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar un producto por su id
router.delete("/products/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const deletedProduct = await manager.deleteProductById(id);
    res.status(200).json({
      message: "Producto eliminado correctamente",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
