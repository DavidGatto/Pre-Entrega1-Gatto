const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://daviddgatto:12345@coderdb.bnklr4n.mongodb.net/ecommerce?retryWrites=true&w=majority"
  )
  .then(() => console.log("Conectado"))
  .catch(() => console.log("Error al conectarse"));
