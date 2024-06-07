const express = require("express");
const router = express.Router();

function issigned(req, res, next) {
  next();
}

router.get("/", (req, res) => {

    // backedn

  res.render("index", {
    blogs: [{ title: "NamoBharat", desc: "This is New India", id: "alpha420" }],
  });
});

router.get("/getblog/:id", (req, res) => {
  console.log(req.params.id);
});

router.get("/createdb", issigned, (req, res) => {
  res.render("blog");
});
router.post("/create", issigned, (req, res) => {
    
});

module.exports = router;
