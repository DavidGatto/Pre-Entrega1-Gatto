const express = require("express");
const router = express.Router();
const UserModel = require("../dao/models/user.model.js");
const passport = require("passport");

// router.post("/", async (req, res) => {
//   const { first_name, last_name, email, password, age } = req.body;

//   try {
//     const existingUser = await UserModel.findOne({ email: email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .send({ error: "El correo electrónico ya está en uso" });
//     }

//     const newUser = await UserModel.create({
//       first_name,
//       last_name,
//       email,
//       password,
//       age,
//     });

//     req.session.login = true;
//     req.session.user = { ...newUser._doc };

//     res.redirect("/profile");
//   } catch (error) {
//     console.error("Error al crear el usuario:", error);
//     res.status(500).send({ error: "Error interno del servidor" });
//   }
// });

router.post(
  "/",
  passport.authenticate("register", {
    failureRedirect: "/failregister",
  }),
  async (req, res) => {
    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", message: "Datos incorrectos" });

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
    };

    req.session.login = true;

    res.redirect("/api/products");
  }
);

router.get("/failregister", (req, res) => {
  res.send({ error: "Error al registrarse" });
});

module.exports = router;
