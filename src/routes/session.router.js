const express = require("express");
const router = express.Router();
const UserModel = require("../dao/models/user.model.js");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        let role = "usuario";

        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
          role = "admin";
        }

        req.session.login = true;
        req.session.user = {
          email: user.email,
          age: user.age,
          first_name: user.first_name,
          last_name: user.last_name,
          role: role,
        };
        res.redirect("/profile");
      } else {
        res.status(403).send({ error: "Contraseña incorrecta" });
      }
    } else {
      res.status(404).send({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(400).send({ error: "Error al loguearse" });
  }
});

router.get("/logout", (req, res) => {
  if (req.session.login) {
    req.session.destroy();
  }
  res.status(200).send({ message: "logout correcto" });
});

module.exports = router;
