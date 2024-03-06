const express = require("express");
const router = express.Router();
const UserModel = require("../dao/models/user.model.js");
const passport = require("passport");

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await UserModel.findOne({ email: email });

//     if (user) {
//       if (user.password === password) {
//         let role = "usuario";

//         if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
//           role = "admin";
//         }

//         req.session.login = true;
//         req.session.user = {
//           email: user.email,
//           age: user.age,
//           first_name: user.first_name,
//           last_name: user.last_name,
//           role: role,
//         };
//         res.redirect("/api/products");
//       } else {
//         res.status(403).send({ error: "Contraseña incorrecta" });
//       }
//     } else {
//       res.status(404).send({ error: "Usuario no encontrado" });
//     }
//   } catch (error) {
//     res.status(400).send({ error: "Error al loguearse" });
//   }
// });

router.get("/logout", (req, res) => {
  if (req.session.login) {
    req.session.destroy();
  }
  res.redirect("/");
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/faillogin",
  }),

  async (req, res) => {
    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", message: "Datos incorrectos" });

    let role = "usuario";

    if (req.user.email === "adminCoder@coder.com") {
      role = "admin";
    }

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      role: role,
    };

    req.session.login = true;

    res.redirect("/api/products");
  }
);

router.get("/faillogin", async (req, res) => {
  console.log("Error al iniciar sesion");
  res.send({ error: "Error al iniciar sesion" });
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/api/preoducts");
  }
);

module.exports = router;
