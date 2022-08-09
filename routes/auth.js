const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const authRouter = express.Router();

const User = require("../model/user");

const { checkIsAuth } = require("../utils/checkIsAuth");

authRouter
  .post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.json("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.json("Successfully Authenticated");
        });
      }
    })(req, res, next);
  })

  .post("/register", async (req, res) => {
    const { email, name, password, username } = req.body;

    User.findOne({ email: email }, async (err, user) => {
      if (err) throw err;
      if (user) res.json("User Already Exists");
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
          email,
          name,
          password: hashedPassword,
          username,
        });

        res.json("User Created successfully.");
      }
    });
  })

  .post("/logout", function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.json("Logged out.");
    });
  })

  .get("/user", checkIsAuth, (req, res) => {
    res.json(req.user);
  });
module.exports = {
  authRouter,
};
