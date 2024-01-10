const express = require("express");
const router = express.Router();

const CartManager = require("../controllers/cart-manager.js");

const manager = new CartManager("./src/models/carts.json");

// Ruta para crear un nuevo carrito
router.post("/carts", async (req, res) => {
  try {
    const newCart = await manager.createCart();
    res.json(newCart);
  } catch (error) {
    console.error("Error del carrito", error);

    res.json({ error: "Error del servidor" });
  }
});

// Ruta para obtener un carrito específico por su ID
router.get("/carts/:cid", async (req, res) => {
  const cartId = parseInt(req.params.cid);
  try {
    const cart = await manager.getCartById(cartId);
    res.json(cart.products);
  } catch (error) {
    console.error(`Error al obtener el carrito por ID ${cartId}`, error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para agregar un producto a un carrito específico
router.post("/carts/:cid/product/:pid", async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  try {
    const updatedCart = await manager.addProductToCart(
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

module.exports = router;
