const bcrypt = require("bcryptjs");

module.exports = {
  registerAdmin: async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body,
      db = req.app.get("db"),
      { session } = req;

    let user = await db.admin.check_admin(email);
    if (user[0]) {
      return res.status(400).send("Email already exists");
    }
    const full_name = name
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    let newUser = await db.admin.register_admin(
      full_name, email, hash);

    res.sendStatus(201);
  },
  loginAdmin: async (req, res) => {
    const { email, password } = req.body,
      db = req.app.get("db"),
      { session } = req;

    let user = await db.admin.check_admin(email);
    if (!user[0]) {
      return res.status(400).send("User not found");
    }
    const authorized = bcrypt.compareSync(password, user[0].password);
    if (!authorized) {
      return res.status(401).send("Incorrect Password");
    }
    delete user[0].password;
    session.user = user[0];
    res.status(202).send(session.user);
  },
  logoutAdmin: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  getAdmin: async (req, res) => {
    const db = req.app.get("db");
    const { email } = req.body;

    let admin = await db.admin.check_admin(email);
    if (admin[0]) {
      res.status(200).send(admin);
    } else {
      res.status(200).send("No admin on session");
    }
  }
};
