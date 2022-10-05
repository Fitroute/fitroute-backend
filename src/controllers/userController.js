const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, surname, email, password, country, city } = req.body;

  //Password Hashing
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const user = new User({ ...req.body, password: hash });
  user
    .save()
    .then(() => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  await User.findOne({ email })
    .then((user) => {
      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid)
        return res.status(400).json({ message: "Email or password is wrong" });
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
module.exports = { register, login };
