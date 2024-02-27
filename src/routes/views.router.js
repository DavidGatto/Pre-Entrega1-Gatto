const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/db/product-manager-db.js");
const CartManager = require("../dao/db/cart-manager-db.js");
const manager = new ProductManager();
const managerc = new CartManager();

router.get("/api/products", async (req, res) => {
  try {
    let page = req.query.page;
    const limit = req.query.limit || 2;
    if (!page || isNaN(page)) {
      page = 1;
    }

    const sort = req.query.sort || "";
    const query = req.query.query || "";

    const productsList = await manager.getProducts(limit, page, sort, query);
    console.log(productsList);

    const productsFinal = productsList.docs.map((product) => {
      const { _id, ...prod } = product.toObject();
      return prod;
    });

    res.render("products", {
      products: productsFinal,
      hasPrevPage: productsList.hasPrevPage,
      hasNextPage: productsList.hasNextPage,
      prevPage: productsList.prevPage,
      nextPage: productsList.nextPage,
      currentPage: productsList.page,
      totalPages: productsList.totalPages,
    });
  } catch (error) {
    console.error("Error al obtener productos", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.get("/api/carts/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const { products } = await managerc.getCartById(cartId);

    const productsWithStringsIds = products.map((product) => ({
      quantity: product.quantity,
      _id: product._id.toString(),
    }));

    res.render("carts", { cartId: cartId, products: productsWithStringsIds });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/login", (req, res) => {
  if (req.session.login) {
    return res.redirect("/profile");
  }

  res.render("login");
});

router.get("/register", (req, res) => {
  if (req.session.login) {
    return res.redirect("/profile");
  }
  res.render("register");
});

router.get("/profile", (req, res) => {
  if (!req.session.login) {
    return res.redirect("/login");
  }

  res.render("profile", { user: req.session.user });
});

module.exports = router;
