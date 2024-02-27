const express = require("express");
const router = express.Router();
const Cart = require("../dao/models/cart.model.js");

const CartManager = require("../dao/db/cart-manager-db.js");

const managerc = new CartManager();

// Ruta para crear un nuevo carrito
router.post("/carts", async (req, res) => {
  try {
    const newCart = await managerc.createCart();
    res.json(newCart);
  } catch (error) {
    console.error("Error del carrito", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Ruta para agregar un producto a un carrito específico
router.post("/carts/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {
    const updatedCart = await managerc.addProductToCart(
      cartId,
      productId,
      quantity
    );
    res.json(updatedCart.products);
  } catch (error) {
    console.error("Error al agregar producto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para eliminar un producto de un carrito específico
router.delete("/carts/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cid,
      { $pull: { products: { _id: pid } } },
      { new: true }
    );
    res.json(updatedCart.products);
  } catch (error) {
    console.error("Error al eliminar producto del carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para actualizar el carrito con un arreglo de productos
router.put("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cid,
      { products },
      { new: true }
    );
    res.json(updatedCart.products);
  } catch (error) {
    console.error("Error al actualizar el carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para actualizar la cantidad de ejemplares de un producto en un carrito específico
router.put("/carts/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: cid, "products._id": pid },
      { $set: { "products.$.quantity": quantity } },
      { new: true }
    );
    res.json(updatedCart.products);
  } catch (error) {
    console.error(
      "Error al actualizar la cantidad del producto en el carrito",
      error
    );
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para eliminar todos los productos de un carrito específico
router.delete("/carts/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cid,
      { products: [] },
      { new: true }
    );
    res.json(updatedCart.products);
  } catch (error) {
    console.error("Error al eliminar todos los productos del carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
