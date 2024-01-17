const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const PUERTO = 8080;
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));

//Routes
app.use("/api", productsRouter);
app.use("/api", cartsRouter);
app.use("/", viewsRouter);

// Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

const server = app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});

const ProductManager = require("./controllers/product-manager.js");
const manager = new ProductManager("./src/models/products.json");

const io = socket(server);

io.on("connection", async (socket) => {
  console.log("New client connected");

  // Send the array of products to the connected client:
  socket.emit("products", await manager.getProducts());

  // Receive the "deleteProduct" event from the client:
  socket.on("deleteProduct", async (id) => {
    await manager.deleteProductById(id);
    // Send the updated array of products to all clients:
    io.sockets.emit("products", await manager.getProducts());
  });

  // Receive the "addProduct" event from the client:
  socket.on("addProduct", async (product) => {
    await manager.addProduct(product);
    // Send the updated array of products to all clients:
    io.sockets.emit("products", await manager.getProducts());
  });
});
