const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcpt = require("bcrypt");
const asynchandler = require("express-async-handler");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  let { username, email, password } = req.body;

  const available = await userModel.findOne({email});
  if(available){
    res.render('error');
  }
  else{
    if (!username || !email || !password) {
      throw new Error("ALL FIELDS ARE MANDATORY");
    }
    const hashedpass = await bcpt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashedpass,
    });
    res.redirect("/login");
  }
});

router.get("/login", (req, res) => {
  const token = req.cookies["token"];
  if (token) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

router.get("/blog", (req, res) => {
  res.send("BLOG PAGE");
});

router.post(
  "/login",
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
        // res.json({ accesstoken });
        res.render('success',{success:['Logged in','Your Logged in successfully']});
      } else {
        throw new Error("Invalid Credentials");
      }
    }
  })
);

module.exports = router;
