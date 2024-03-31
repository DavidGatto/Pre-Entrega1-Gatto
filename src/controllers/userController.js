class UserController {
  async register(req, res) {
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

  async failRegister(req, res) {
    res.send({ error: "Error al registrarse" });
  }
}

module.exports = UserController;
