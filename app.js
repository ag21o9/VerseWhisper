const express = require("express");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const mainRoute = require("./routes/mainRoute");
const adminRoute = require("./routes/adminRoute");
const connectdb = require("./config/dbconnect");
const cookie = require('cookie-parser')

connectdb();

const port = process.env.PORT || 5000;
const app = express();

app.use(cookie())
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/", mainRoute);
app.use("/", adminRoute);

app.use((err, req, res, next) => {
  res.render("error",{error:err});
});

app.listen(port, () => {
  console.log("App listening on port " + port);
});

