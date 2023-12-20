const ProductManager = require("./product-manager");
const express = require("express");
const manager = new ProductManager("./src/products.json");
const PUERTO = 8080;
const app = express();

// Ruta para obtener todos los productos o una cantidad limitada
app.get("/products", async (req, res) => {
  try {
    const productsArray = await manager.readFile();

    let limit = parseInt(req.query.limit);

    if (limit) {
      // Si hay un limite devuelve solo la cantidad especificada de productos
      const arrayLimit = productsArray.slice(0, limit);
      return res.send(arrayLimit);
    } else {
      // Si no hay limite devuelve todos los productos
      return res.send(productsArray);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error interno del servidor");
  }
});

// Ruta para obtener un producto por su id
app.get("/products/:pid", async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);

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

app.listen(PUERTO, () => {
  console.log(`Escuchando en http://localhost:${PUERTO}`);
});
