const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcpt = require("bcrypt");
const asynchandler = require("express-async-handler");

router.get("/create", (req, res) => {
  res.render("register");
});

router.post("/registeruser", async (req, res) => {
  let { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("ALL FIELDS ARE MANDATORY");
  }
  const hashedpass = await bcpt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hashedpass,
  });
  res.json({ user });

  // res.redirect('/login');
});

router.get("/login", (req, res) => {
  const token = req.cookies["token"];
  if (token) {
    res.redirect("/blog");
  } else {
    res.render("login");
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("Cookie Deleted");
});

router.get("/blog", (req, res) => {
  res.send("BLOG PAGE");
});

router.post(
  "/loginuser",
  asynchandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("ALL FIELDS ARE MANDATORY");
    } else {
      const user = await userModel.findOne({ email });
      if (user && (await bcpt.compare(password, user.password))) {
        const accesstoken = jwt.sign(
          {
            user: {
              username: user.username,
              email: user.email,
              id: user.id,
            },
          },
          process.env.SECRET_TOKEN
        );
        res.cookie("token", accesstoken);
        res.json({ accesstoken });
      } else {
        throw new Error("Invalid Credentials");
      }
    }
  })
);

module.exports = router;
