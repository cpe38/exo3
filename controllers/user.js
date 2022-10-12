const User = require("../models/User");
const bcrypt = require("bcrypt");
const event = require("../events/sendMail");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => {
          event.emit("sendMail", { email: user.email });
          res.status(201).json({ message: "User created" });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((userFound) => {
      if (!userFound) {
        return res.status(401).json({ message: "Paire login/pass incorect" });
      }
      bcrypt
        .compare(req.body.password, userFound.password)
        .then((passOK) => {
          if (!passOK) {
            return res
              .status(401)
              .json({ message: "Paire login/pass incorect" });
          }
          res.status(200).json({
            userId: userFound._id,
            token: jwt.sign({ userId: userFound._id }, "RANDOM_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
